import { delTest } from "@/service/api/login";
import { uniqMessage } from "@/utils";
import { Button } from "antd";
import { memo } from "react";

const AxiosTest = () => {
  const request = async () => {
    delTest([])
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err:", err);
        uniqMessage("error", err.message + 111);
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
