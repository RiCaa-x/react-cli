import { DatePickerProps, InputNumberProps, InputProps, Table } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { DefaultOptionType, SelectProps } from "antd/es/select";

type EditConfig = {
  dataIndex: string;
  editType?: EditCellType; // 修改类型
  inputConfig?: InputProps; // Input的额外配置项
  inputNumberConfig?: InputNumberProps; // InputNumber的额外配置项
  selectConfig?: SelectProps; // Select的额外配置项
  datePickerConfig?: DatePickerProps; // DatePicker的额外配置项
  rangePickerConfig?: RangePickerProps; // RangePicker的额外配置项
};

export type EditCellType = "input" | "inputNumber" | "select" | "datePicker" | "rangePicker";
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
export type EditColumnTypes = (ColumnTypes[number] & EditConfig)[];

// 下拉框options：其中key为当前columns的dataIndex
export type AllOptions = {
  [s: string]: DefaultOptionType[];
};
