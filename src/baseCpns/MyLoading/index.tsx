import { Spin } from "antd";
import { memo } from "react";
import { MyLoadingWrapper } from "./styled";

const MyLoading = () => {
  return (
    <MyLoadingWrapper>
      <Spin tip="数据加载中，请稍候" style={{ fontSize: "20px" }} />
    </MyLoadingWrapper>
  );
};

export default memo(MyLoading);
