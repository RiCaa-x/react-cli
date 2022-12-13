import { useAsyncEffect, useUpdateEffect } from "ahooks";
import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import { TOKEN } from "@/constants";
import { changeDynamicRoutes, changeHomePath } from "@/store/globalReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { localCache } from "@/utils/cache";
import { defaultRoutes } from "./defaultRoutes";
import { addRoutes, getHomePath, IMyRouteObject, mapAllRouter } from "./lib";
import { getDynamicRoutes } from "./lib/temporaryData";

const FullPageLoading = lazy(() => import("@/components/FullPageLoading"));

const createRouter = __ISDEV__ ? createBrowserRouter : createHashRouter;

export function getAllRoutes(dynamicRoutes: IMyRouteObject[], needNoLayouts: boolean = true) {
  const { widthLayouts, noLayouts } = defaultRoutes;
  return [...(widthLayouts || []), ...(noLayouts && needNoLayouts ? noLayouts : []), ...dynamicRoutes];
}

export default () => {
  const { dynamicRoutes } = useAppSelector(state => state.globalReducer);
  const dispatch = useAppDispatch();

  const [routes, setRoutes] = useState<IMyRouteObject>(addRoutes(defaultRoutes));

  // 首次加载，注册动态路由：
  useAsyncEffect(async () => {
    const hasLogin = localCache.getCache(TOKEN);
    if (hasLogin) {
      // 后续这里要走接口：
      const _dynamicRoutes = getDynamicRoutes();
      dispatch(changeDynamicRoutes(_dynamicRoutes));
    }
  }, []);

  useUpdateEffect(() => {
    let homePath = "";
    if (dynamicRoutes.length) {
      const _dynamicRouteList: IMyRouteObject[] = [];
      dynamicRoutes.forEach(item => {
        _dynamicRouteList.push(item);
      });
      const widthLayouts = getAllRoutes(dynamicRoutes, false);
      homePath = getHomePath(widthLayouts);
      const _routes = addRoutes({
        widthLayouts,
        noLayouts: defaultRoutes.noLayouts
      });
      setRoutes(_routes);
      dispatch(changeHomePath(homePath)); // 首页路径，用于重定向
    }
  }, [dynamicRoutes]);

  return (
    <Suspense fallback={<FullPageLoading />}>
      <RouterProvider router={createRouter(mapAllRouter([routes]))} />
    </Suspense>
  );
};
