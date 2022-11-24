import { lazy } from "react";

import { IAddRoute } from "./lib";

const Login = lazy(() => import("@/pages/Login"));
const TestPage = lazy(() => import("@/pages/TestPage"));

// 路由：
export const defaultRoutes: IAddRoute = {
  widthLayouts: [
    {
      path: "/index",
      label: "首页",
      isHome: true,
      element: <TestPage />,
      icon: "menu_product.svg"
    }
  ],
  noLayouts: [{ path: "login", label: "登录", element: <Login /> }]
};
