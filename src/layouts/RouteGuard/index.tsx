// 守卫组件：
import { memo, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { TOKEN } from "@/constants";
import { useAppTitle } from "@/hooks";
import { getAllRoutes } from "@/router";
import { cacheCurrentLabel } from "@/router/lib";
import { CancelRequest } from "@/service/axios/cancelRequest";
import { useAppSelector } from "@/store/hooks";
import { localCache } from "@/utils/cache";

const RouteGuard = () => {
  const { homePath, dynamicRoutes } = useAppSelector(state => state.globalReducer);
  const { pathname } = useLocation();
  // 页面跳转时，中断上个页面所有已发出但未回来的请求：
  useEffect(() => {
    CancelRequest.clearCache();
  }, [pathname]);

  const [appTitle, setAppTitle] = useState("");
  useAppTitle(appTitle);
  useEffect(() => {
    const title = cacheCurrentLabel(pathname, getAllRoutes(dynamicRoutes));
    setAppTitle(title);
  }, [pathname, dynamicRoutes]);

  return <>{judgeRoute(pathname, homePath)}</>;
};

export default memo(RouteGuard);

function judgeRoute(pathname: string, homePath: string) {
  if (pathname === "/login") return <Outlet />;

  // 验证token是否存在，如果不存在就路由重定向到登录界面
  if (localCache.getCache(TOKEN)) {
    if (pathname === "/") return <Navigate to={homePath} replace />;
    else return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
