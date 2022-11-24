import { IMyRouteObject } from "@/router/lib";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGlobalState {
  dynamicRoutes: IMyRouteObject[]; // 动态路由列表
  homePath: string; // 系统首页
}
// 首页路径，用于重定向。(如果是某个动态路由的作为首页，则传空字符串即可)
export const defaultHomePath = "/index";
const initialState: IGlobalState = {
  dynamicRoutes: [],
  homePath: defaultHomePath
};

// 创建公用的slice：
const globalSlice = createSlice({
  name: "global", // 命名空间
  initialState, // 初始值
  reducers: {
    changeDynamicRoutes(state, actions: PayloadAction<any[]>) {
      state.dynamicRoutes = actions.payload;
    },
    changeHomePath(state, actions: PayloadAction<string>) {
      state.homePath && state.homePath !== actions.payload && (state.homePath = actions.payload);
    },
    clearGlobalStore(state) {
      state.dynamicRoutes = [];
      state.homePath = defaultHomePath;
    }
  }
});

export const { changeDynamicRoutes, changeHomePath, clearGlobalStore } = globalSlice.actions;
export default globalSlice.reducer;
