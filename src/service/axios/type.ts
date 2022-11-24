import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建实例对象时的interceptor type：
interface RSInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;

  responseInterceptor?: (res: AxiosResponse<IResponse>) => AxiosResponse<IResponse>;
  responseInterceptorCatch?: (err: any) => any;
}

// 创建实例对象时的config type：
export interface RSRequestConfig extends AxiosRequestConfig {
  code?: number;
  clearRes?: boolean;
  interceptors?: RSInterceptor;
}

// 新建单个接口的config type：
export interface ItemRequestConfig<ResData = any> extends AxiosRequestConfig {
  code?: number;
  clearRes?: boolean;
  interceptors?: {
    // 注：创建单个接口时无需requestInterceptor，因为requestInterceptor要执行的逻辑完全可以放在 get/post 的参数中！！
    responseInterceptor?: (res: ResType<ResData>) => ResType<ResData>;
  };
}
export type ResType<ResData> = ResData extends IResponse | Blob ? ResData : IResponse<ResData>;
