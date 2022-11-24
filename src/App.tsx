import { useSetState } from "ahooks";
import { FC } from "react";

import { GlobalContext, globalContextType, globalValueType } from "@/context";
import { useAppConfiguration } from "@/hooks";

import FullPageLoading from "./components/FullPageLoading";
import BasicRouter from "./router";

import "@/assets/styles/global.less";

const App: FC = () => {
  const [globalContextValue, setGlobalContextValue] = useSetState<globalContextType>({
    loading: false,
    setGlobalContext: changeGlobalContext
  });

  // 修改全局context变量：
  function changeGlobalContext(data: globalValueType) {
    data && setGlobalContextValue(data);
  }

  useAppConfiguration();

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <BasicRouter />

      <FullPageLoading loading={!!globalContextValue.loading} />
    </GlobalContext.Provider>
  );
};

export default App;
