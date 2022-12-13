import { _testApi } from "@/service/api/login";
import { Button } from "antd";
import { memo } from "react";

const AxiosTest = () => {
  const request = () => {
    _testApi({ data: 1 }).then(res => {
      console.log(res);
    });
  };

  return (
    <div>
      <Button type="primary" onClick={request}>
        请求
      </Button>
    </div>
  );
};

export default memo(AxiosTest);
