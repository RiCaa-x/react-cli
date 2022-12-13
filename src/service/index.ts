import RSRequest from "./axios/request";

// Demo：
// const MyRequest = new RSRequest({
//   timeout: 15000,
//   // 自定义配置项：
//   interceptors: {
//     requestInterceptor: config => {
//       // 测试携带token：
//       const token = localCache.getCache('token'); // store或localStorage中的token值
//       if (token) {
//         config.headers!.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     responseInterceptor: res => {
//       return res;
//     }
//   },
//   code: 200, // 设置整个实例的code，会替代全局的DEFAULT_CODE
//   clearRes: false // 设置整个实例是否返回清楚明了的res
// });

export const MyRequest = new RSRequest({
  timeout: 15000,
  code: 200,
  interceptors: {
    responseInterceptor: res => {
      return res;
    }
  }
});
