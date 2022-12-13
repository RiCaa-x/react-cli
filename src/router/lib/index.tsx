import { FC, lazy, LazyExoticComponent, ReactNode } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import { spliceUrl } from "@/utils";
import { getAllRoutes } from "..";

const RouteGuard = lazy(() => import("@/layouts/RouteGuard"));
const Layouts = lazy(() => import("@/layouts"));
const NotFound = lazy(() => import("@/layouts/NotFound"));
const ErrorElement = lazy(() => import("@/layouts/ErrorElement"));

/**
 * 路由配置
 */
export interface IMyRouteObject {
  path: string;
  label?: string; // 有名称的就会被当做菜单项
  element?: ReactNode; // 固有路由组件
  elementPath?: string; // 动态路由的组件所在路径
  isHome?: boolean; // 是否是首页，每个系统都要指定一个
  icon?: ReactNode; // 菜单icon或者icon文件名，如果是文件名，需要把图片放在public/menuImgs下
  disabled?: boolean;
  children?: IMyRouteObject[];
}

export type MenuItem = {
  label: string;
  key: string;
  icon: ReactNode;
  children?: MenuItem[];
};

export interface IAddRoute {
  widthLayouts?: IMyRouteObject[];
  noLayouts?: IMyRouteObject[];
}
export function addRoutes(routes: IAddRoute) {
  const defaultRoutes: IMyRouteObject = {
    path: "/",
    element: <RouteGuard />,
    children: [
      {
        path: "",
        element: <Layouts />,
        children: [
          ...(routes.widthLayouts || []),
          { path: "errorElement", element: <ErrorElement /> },
          { path: "*", element: <NotFound /> }
        ]
      },
      ...(routes.noLayouts || [])
    ]
  };
  return defaultRoutes;
}

function getUrlPath(path: string) {
  if (!path) return "";
  return path.startsWith("/") ? path : "/" + path;
}

export function getHomePath(routes: IMyRouteObject[]) {
  let homePath = "";
  routes.find(item => {
    if (item.isHome) {
      homePath += getUrlPath(item.path);
      return true;
    } else if (item.children) {
      const childPath = getHomePath(item.children);
      if (childPath) {
        homePath = getUrlPath(item.path) + childPath;
        return true;
      }
    }
  });
  return homePath;
}
// 动态导入路由组件：
const getDynamicElement = (elementPath: string) => {
  const fullPath = "/src/router/dynamicRoutes" + getUrlPath(elementPath);
  const fileList: AnyObject = import.meta.glob("@/router/dynamicRoutes/**/*.ts", {
    eager: true,
    import: "default"
  });
  let Module: LazyExoticComponent<FC> | undefined;
  if (fileList[fullPath]) {
    Module = fileList[fullPath];
  }
  return Module ? <Module /> : "";
};

// 动态加载所有路由：
export function mapAllRouter(routes: IMyRouteObject[]): RouteObject[] {
  const allRouters: RouteObject[] = [];
  routes.forEach(item => {
    const curRouter: RouteObject = {
      path: item.path
    };

    // 当前路由对应的组件：
    let curElement: ReactNode | undefined;
    if (item.element) {
      curElement = item.element;
    } else if (item.elementPath) {
      curRouter.errorElement = <Navigate to="/errorElement" replace state={{ errPath: item.elementPath }} />; // 导入失败时展示的组件
      curElement = getDynamicElement(item.elementPath);
    }

    // 当前路由:
    curElement && (curRouter.element = curElement);
    // 子路由：
    item.children?.length && (curRouter.children = mapAllRouter(item.children));
    // 匹配到了当前路由或者当前路由下有子路由，才添加路由信息。防止后端传入错误的地址信息：
    (curElement || curRouter.children?.length) && allRouters.push(curRouter);
  });

  return allRouters;
}

// 渲染菜单：
export function renderMenu(dynamicRoutes: IMyRouteObject[], fatherPath: string = ""): MenuItem[] {
  let menu: MenuItem[] = [];
  getAllRoutes(dynamicRoutes, false).forEach(item => {
    const fullPath = spliceUrl(fatherPath, item.path!);
    if (item.label) {
      let icon: ReactNode = item.icon || "";
      if (item.icon && typeof item.icon === "string") {
        icon = <img src={`/menuImgs/${item.icon}`} />;
      }
      const curMenu: MenuItem = {
        label: item.label,
        key: fullPath,
        icon
      };
      // 如果有children：
      if (item.children) {
        const children: MenuItem[] = renderMenu(item.children, fullPath);
        curMenu.children = children;
      }

      menu.push(curMenu);
    } else if (item.children) {
      menu = renderMenu(item.children, fullPath);
    }
  });

  return menu;
}

// 向本地缓存中存入菜单标题：
export function cacheCurrentLabel(pathname: string, allRoutes: IMyRouteObject[] = []) {
  const menuList = renderMenu(allRoutes);
  let currentLabel: string = recursionLabel(pathname, menuList);

  return currentLabel;
}
function recursionLabel(pathname: string, menuList: MenuItem[]) {
  let currentLabel: string = "";
  menuList.find(item => {
    if (item.key === pathname) {
      return (currentLabel = item.label);
    } else if (item.children) {
      return (currentLabel = recursionLabel(pathname, item.children));
    }
  });

  return currentLabel;
}
