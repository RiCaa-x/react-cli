import MyScrollTable from "@/baseCpns/MyScrollTable";
import { AllOptions, EditColumnTypes } from "@/baseCpns/MyScrollTable/type";
import { ACTIVE_TABLE_ROW } from "@/constants";
import { memo, useState } from "react";
import AxiosTest from "./cpns/AxiosTest";

const TestPage = () => {
  const [dataSource, setDataSource] = useState(data);

  const handleSave = (row: ITableData) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => item.key === row.key);
    newData.splice(index, 1, row);
    setDataSource(newData);
  };
  const allOptions: AllOptions = {
    address: [
      {
        label: "11111111",
        value: 1
      },
      {
        label: "2222222",
        value: 2
      },
      {
        label: "3333333",
        value: 3
      }
    ]
  };

  return (
    <div style={{ height: "100%", padding: 24, backgroundColor: "#fff" }}>
      <MyScrollTable<ITableData>
        tableKey="scrol_table"
        headHeight={48}
        tableHeight={500}
        pagination={false}
        bordered
        columns={columns}
        rowClassName={(_, i) => (i === 1 ? ACTIVE_TABLE_ROW : "")}
        dataSource={dataSource}
        editCellConfig={{
          handleSave,
          allOptions
        }}
      />
      <div style={{ height: 36 }} />
      <AxiosTest />
    </div>
  );
};

export default memo(TestPage);

interface ITableData {
  key: string;
  name: string;
  age: string;
  address: number;
  date: string;
}

const columns: EditColumnTypes = [
  {
    title: "名称",
    dataIndex: "name",
    width: "25%",
    editType: "input",
    inputConfig: {
      allowClear: true
    }
  },
  {
    title: "年龄",
    dataIndex: "age",
    width: "15%",
    editType: "inputNumber",
    inputNumberConfig: {}
  },
  {
    title: "地址",
    dataIndex: "address",
    editType: "select",
    selectConfig: {
      allowClear: true,
      showSearch: true,
      optionFilterProp: "label"
    }
  },
  {
    title: "日期",
    dataIndex: "date",
    editType: "datePicker",
    datePickerConfig: {
      showTime: false
    }
  },
  {
    title: "日期范围",
    dataIndex: "dateRange",
    editType: "rangePicker",
    width: 320,
    rangePickerConfig: {}
  }
];
const data = Array.from(
  { length: 10000 },
  (_, i) =>
    ({
      key: (i + 1).toString(),
      name: `Edrward ${i + 1}`,
      age: 32,
      address: (i + 1) % 3 || 3,
      date: "2022-12-23 00:00:01",
      dateRange: ["2022-12-23 12:12:55", "2022-12-30 23:59:58"]
    } as unknown as ITableData)
);
