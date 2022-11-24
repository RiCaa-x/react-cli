import { EMPTY_PLACE_HOLDER } from "@/constants";
import { DefaultOptionType } from "antd/es/select";
import { ReactNode } from "react";
import { AllOptions, EditCellType } from "./type";

export function setTableStyleToHead(tableKey: string, bodyHeight: number, headHeight: number) {
  const customStyleName = `${tableKey}_custom_style`;
  let customStyleDom = document.querySelector("#" + customStyleName);

  if (!customStyleDom) {
    customStyleDom = document.createElement("style");
    customStyleDom.id = customStyleName;
    document.head.appendChild(customStyleDom);
  }

  (
    customStyleDom as HTMLElement
  ).innerText = `#${tableKey} .ant-table-placeholder, #${tableKey} .ant-table-body{height:${bodyHeight}px} #${tableKey} .ant-spin-spinning{height:${
    bodyHeight + headHeight
  }px !important; max-height:unset !important }`;
}

export function getRowClassName<T = AnyObject>(record: T, index: number, rowClassName: any) {
  let className = ["editable-row"];
  if (typeof rowClassName === "string") {
    className.push(rowClassName);
  } else if (typeof rowClassName === "function") {
    className.push(rowClassName(record, index));
  }
  return className.join(" ");
}

export function formatEditColumnsType<T = AnyObject>(
  columns: AnyObject,
  handleSave: (row: T) => void,
  allOptions: AllOptions = {}
): AnyObject[] {
  return columns.map((col: AnyObject) => {
    if (col.children) {
      return {
        ...col,
        children: formatEditColumnsType(col.children, handleSave, allOptions)
      };
    } else if (!col.editType) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        title: col.title,
        dataIndex: col.dataIndex,
        editType: col.editType,
        editItemConfig: col[col.editType + "Config"] || {},
        handleSave,
        allOptions
      })
    };
  });
}

export function getEditLabel(
  editType: EditCellType,
  value: string | number | string[],
  options: DefaultOptionType[] = []
) {
  let label: ReactNode = value;
  switch (editType) {
    case "select":
      label = options.find(item => item.value === value)?.label;
      break;
    case "rangePicker":
      label = (value as string[]).join("~");
      break;
    default:
      break;
  }

  return label || EMPTY_PLACE_HOLDER;
}
