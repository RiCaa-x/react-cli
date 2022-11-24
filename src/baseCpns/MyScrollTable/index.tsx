import { useMemoizedFn } from "ahooks";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { memo, ReactElement, useEffect, useRef, useState } from "react";
import { useVT } from "virtualizedtableforantd4";

import { EditableCell, EditableRow } from "./EditableRowCell";
import { Wrapper } from "./styled";

import { AllOptions, EditColumnTypes } from "./type";
import { formatEditColumnsType, getRowClassName, setTableStyleToHead } from "./utils";

const defaultTableHeight = 480;
const defaultTableHeaderHeight = 48;

/**
 * 参数说明：
 * @param tableKey 必传；当前scrollTable的唯一key。整个项目中必须唯一
 * @param columns 必传；一般为antd原始的ColumnsType类型，但如果是可编辑单元格就需要额外配置EditConfig(详见./type.ts)等属性
 * @param tableHeight 可选；滚动表格高度，不传的话需要给父级容器一个height，它会height:100%;
 * @param headHeight 可选；滚动表格的表头高度，不传时取默认值
 * @param headerSplit 可选；表头的分割竖线，没有border时才会显示
 * @param editCellConfig 可选；可编辑单元格，需要传入handleSave保存回调函数，用于修改state。如果有下拉框，则需要传入allOptions对象，对象的key为dataIndex，value为下拉列表。
 * @returns
 */
interface IPropsType<T> extends Omit<TableProps<any>, "size"> {
  tableKey: string;
  columns: EditColumnTypes | ColumnsType<T>;
  tableHeight?: number;
  headHeight?: number;
  headerSplit?: boolean;

  // 可修改单元格相关：
  editCellConfig?: {
    handleSave: (row: T) => void;
    allOptions?: AllOptions;
  };
}

const MyScrollTable = <T extends AnyObject>({
  tableKey,
  tableHeight,
  headHeight = defaultTableHeaderHeight,
  headerSplit = true,
  bordered = false,
  scroll: tableScroll,

  columns = [],
  editCellConfig,
  rowClassName = "",
  ...tableProps
}: IPropsType<T>): ReactElement => {
  // 滚动条相关：
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState({ y: tableHeight || defaultTableHeight });

  const resize = useMemoizedFn(() => {
    const boxHeight = tableHeight
      ? tableHeight
      : tableWrapperRef.current?.offsetHeight || defaultTableHeight;
    const bodyHeight =
      boxHeight -
      headHeight -
      (tableProps.pagination || typeof tableProps.pagination === "undefined" ? 56 : 0);

    // 1. 设置table的scroll：
    setScroll({ y: bodyHeight });
    // 2. 找出当前组件自定义的style标签，如果没有就新建并添加进head
    setTableStyleToHead(tableKey, bodyHeight, headHeight);
  });

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const [VT, setVT] = useVT(() => ({ scroll }), [scroll]);

  useEffect(() => {
    if (editCellConfig?.handleSave) {
      setVT({ body: { row: EditableRow, cell: EditableCell<T> } });
    }
  }, [setVT, editCellConfig?.handleSave]);

  return (
    <Wrapper
      ref={tableWrapperRef}
      id={`${tableKey}`}
      headHeight={headHeight}
      headerSplit={headerSplit}
      bordered={bordered}
      style={{ height: tableHeight || "100%" }}>
      <Table
        bordered={bordered}
        components={tableProps.pagination === false ? VT : undefined}
        {...tableProps}
        rowClassName={(record, i) => getRowClassName<T>(record, i, rowClassName)}
        columns={
          editCellConfig?.handleSave && VT.body?.cell
            ? formatEditColumnsType<T>(
                columns,
                editCellConfig.handleSave,
                editCellConfig?.allOptions
              )
            : columns
        }
        scroll={{ ...tableScroll, ...scroll }}
      />
    </Wrapper>
  );
};

export default memo(MyScrollTable) as typeof MyScrollTable;
