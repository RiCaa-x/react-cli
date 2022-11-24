import { getGoodTime } from "@/utils/dateTime";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { FormInstance } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import React, {
  createContext,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import type { AllOptions, EditCellType } from "./type";
import { getEditLabel } from "./utils";

const { RangePicker } = DatePicker;

// 行：
interface EditableRowProps {
  index: number;
}
const EditableContext = createContext<FormInstance<any> | null>(null);
export const EditableRow = forwardRef<any, EditableRowProps>(({ index, ...props }, ref) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} ref={ref} />
      </EditableContext.Provider>
    </Form>
  );
});

// 可修改列：
interface EditableCellProps<T> {
  record: T;
  title: React.ReactNode;
  dataIndex: string;
  editType: EditCellType;
  editItemConfig: AnyObject;
  handleSave: (record: T) => void;
  children: ReactNode;
  allOptions?: AllOptions;
}
export const EditableCell = <T extends AnyObject>({
  record,
  title,
  dataIndex,
  editType,
  editItemConfig = {},
  children,

  handleSave,
  allOptions = {},

  ...restProps
}: EditableCellProps<T>): ReactElement => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  // 控制各类Select选择器是否打开下拉框，其实可以直接用defaultOpen，但是会有警告，太难看
  const [selectOpen, setSelectOpen] = useState(false);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      editType.includes("select") && setSelectOpen(true);
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    let value = record[dataIndex];
    if (value) {
      if (editType === "datePicker") {
        value = dayjs(value);
      } else if (editType === "rangePicker") {
        value = value.map((date: string) => (date ? dayjs(date) : null));
      }
    }
    form.setFieldsValue({ [dataIndex]: value });
  };

  const save = async () => {
    try {
      editType.includes("select") && setSelectOpen(false);
      const values = await form.validateFields();
      if (editType === "datePicker") {
        values[dataIndex] = getGoodTime(values[dataIndex]);
      } else if (editType === "rangePicker") {
        values[dataIndex] = values[dataIndex].map((date: Dayjs) => getGoodTime(date));
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleClear = async () => {
    try {
      editType.includes("select") && setSelectOpen(false);
      toggleEdit();
      handleSave({ ...record, [dataIndex]: null });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editType) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        {(() => {
          let formItem: ReactNode = null;
          switch (editType) {
            case "input":
              formItem = (
                <Input
                  style={{ width: "100%" }}
                  {...editItemConfig}
                  ref={inputRef}
                  onPressEnter={save}
                  onBlur={save}
                />
              );
              break;
            case "inputNumber":
              formItem = (
                <InputNumber
                  style={{ width: "100%" }}
                  {...editItemConfig}
                  ref={inputRef}
                  onPressEnter={save}
                  onBlur={save}
                />
              );
              break;
            case "select":
              formItem = (
                <Select
                  style={{ width: "100%" }}
                  {...editItemConfig}
                  ref={inputRef}
                  open={selectOpen}
                  options={allOptions[dataIndex] || []}
                  onSelect={save}
                  onBlur={save}
                  onClear={handleClear}
                />
              );
              break;
            case "datePicker":
              formItem = (
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  {...editItemConfig}
                  defaultOpen
                  ref={inputRef}
                  onOk={save}
                  onBlur={save}
                />
              );
              break;
            case "rangePicker":
              formItem = (
                <RangePicker
                  showTime
                  style={{ width: "100%" }}
                  {...editItemConfig}
                  defaultOpen
                  ref={inputRef}
                  onBlur={e => !e.target.id && save()}
                />
              );
              break;
          }
          return formItem;
        })()}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {getEditLabel(editType, record[dataIndex], allOptions[dataIndex])}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
