import { EMPTY_PLACE_HOLDER } from '@/constants';
import { IColumnType, UseTableColumns } from '@/typings/antd';
import { useMemo } from 'react';

export const useTableColumns: UseTableColumns = (columns, options) => {
  const { align, withIndex, fixed, placeHolder = EMPTY_PLACE_HOLDER } = options || {};

  return useMemo(() => {
    const finalColumns = columns.map<IColumnType<any>>(item => {
      if (item.children) {
        item.children = item.children.map<IColumnType<any>>(cItem => {
          return { align, fixed, dataIndex: cItem.key, render: value => value ?? placeHolder, ...cItem };
        });
      }
      return { align, fixed, dataIndex: item.key, render: value => value ?? placeHolder, ...item };
    });

    if (withIndex) finalColumns.unshift({ title: '序号', align, fixed, render: (v, r, i) => `${i + 1}`, width: 80 });

    return finalColumns;
  }, [columns, options]);
};

export function serialNumber(pageNum: number, pageSize: number, index: number) {
  return (pageNum - 1) * pageSize + index;
}
