// 临时使用的动态路由假数据，后续需要走接口：
import { IMyRouteObject } from '@/router/lib';

export function getDynamicRoutes() {
  const dynamicRoutes: IMyRouteObject[] = [
    {
      label: 'RiCaa',
      path: '/RiCaa',
      elementPath: 'demoDynamicRoute.ts',
      icon: 'menu_product.svg'
    }
    // {
    //   label: "二级菜单",
    //   path: "secondTest",
    //   icon: "menu_product.svg",
    //   children: [
    //     {
    //       label: "RiCaa",
    //       path: "RiCaa",
    //       elementPath: "/src/router/dynamicRoutes/RiCaa.tsx",
    //       icon: "menu_product.svg"
    //     },
    //     {
    //       label: "RiCaaVirtual",
    //       path: "RiCaaVirtual",
    //       elementPath: "/src/router/dynamicRoutes/RiCaaVirtual.tsx",
    //       icon: "menu_product.svg"
    //     }
    //   ]
    // }
  ];

  return dynamicRoutes;
}
