import type { AxiosInstance } from "axios";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { uniqMessage } from "@/utils";
import { CancelRequest, getFullUrl } from "./cancelRequest";
import { DEFAULT_CODE } from "./constant";
import { ItemRequestConfig, ResType, RSRequestConfig } from "./type";

export default class RSRequest {
  code: number | string;
  clearRes: boolean; // 是否处理res：即返回res.data还是res
  instance: AxiosInstance;

  constructor(options: RSRequestConfig) {
    this.code = options.code != null ? options.code : DEFAULT_CODE;
    this.clearRes = options.clearRes === false ? false : true;
    // 创建并记录axios实例
    this.instance = axios.create(options);

    // 每个实例各自的全局拦截器：
    const interceptor = options.interceptors;
    this.instance.interceptors.request.use(
      interceptor?.requestInterceptor,
      interceptor?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      interceptor?.responseInterceptor,
      interceptor?.responseInterceptorCatch
    );

    // 公用的全局拦截器：
    this.instance.interceptors.request.use(
      config => {
        // 缓存当前请求的url，用于按需中断某个请求：
        const cancelKey = getFullUrl(config);
        // 每次发送请求之前将上一个未完成的相同请求中断：
        CancelRequest.clearCacheWithKey(cancelKey, true);
        // 将当前请求所对应的取消函数存入缓存：
        config.cancelToken = new axios.CancelToken(c => {
          CancelRequest.cache.set(cancelKey, c);
        });

        // 临时保存 cancleKey，用于在响应拦截器中清除缓存
        (config as any).cancelKey = cancelKey;

        NProgress.start();

        return config;
      },
      err => {
        errorCodeHandler();
        throw err;
      }
    );
    this.instance.interceptors.response.use(
      res => {
        // 响应接收之后清除缓存：
        const cancelKey = (res.config as any)?.cancelKey;
        CancelRequest.clearCacheWithKey(cancelKey);

        NProgress.done();

        // IE 8-9
        if (
          res.data == null &&
          res.config.responseType === "json" &&
          res.request.responseText != null
        ) {
          try {
            res.data = JSON.parse(res.request.responseText);
          } catch {}
        }
        return res.data || {};
      },
      err => {
        // 响应异常清除缓存：
        const cancelKey = err.config?.cancelKey;
        CancelRequest.clearCacheWithKey(cancelKey);

        (err?.code !== "ERR_CANCELED" || CancelRequest.cache.size === 0) && NProgress.done();
        throw err;
      }
    );

    /**
     * 注：axios可以实现多个拦截器，不会出现后面替代前面的情况。
     * 每use一个拦截器就像是洋葱多包了一层。依次use拦截器1和拦截器2的执行顺序如下：
     * 拦截器2的request -> 拦截器1的request -> 拦截器1的response -> 拦截器2的response
     */
  }

  // my-request：
  myRequest<Res>(config: ItemRequestConfig<Res>): Promise<Res> {
    return new Promise((resolve, reject) => {
      // 是否需要修改当前请求的code码：
      const currentCode = config.code != null ? config.code : this.code;
      // 是否需要处理当前请求的res返回值：
      const currentClearRes = config.clearRes != null ? config.clearRes : this.clearRes;

      // 调用实例的request方法来发起请求：request接收两个泛型，第一个是axios内部使用的，给any即可；
      this.instance
        .request<any, ResType<Res>>(config)
        .then(res => {
          // 拦截当前这个接口的响应：(模拟实现响应拦截器)
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 情况1: 如果是文件流则直接返回
          if (res instanceof Blob) {
            resolve(res as Res);
          }
          // 情况2: 状态码符合预设，返回res.data或者res
          else if (res.code === currentCode) {
            resolve(currentClearRes ? res.data : res);
          }
          // 情况3: 状态码不符合预设，自动提示错误信息并reject
          // (注：如果想要自定义错误信息的message，直接在cache这个请求并在里面自行uniqMessage即可)
          else {
            errorCodeHandler(res.message || res.msg, res.code);
            // 调用reject，返回res供catch使用
            reject(res);
          }
        })
        .catch(err => {
          // 1. message提示：
          errorHandler(err);
          reject(err);
        });
    });
  }
  // my-get:
  get<Res = IResponse>(config: ItemRequestConfig<Res>) {
    return this.myRequest<Res>({ ...config, method: "GET" });
  }
  // my-post:
  post<Res = IResponse>(config: ItemRequestConfig<Res>) {
    return this.myRequest<Res>({ ...config, method: "POST" });
  }
  // my-delete:
  delete<Res = IResponse>(config: ItemRequestConfig<Res>) {
    return this.myRequest<Res>({ ...config, method: "DELETE" });
  }
  // my-patch:
  patch<Res = IResponse>(config: ItemRequestConfig<Res>) {
    return this.myRequest<Res>({ ...config, method: "PATCH" });
  }
  // my-put:
  put<Res = IResponse>(config: ItemRequestConfig<Res>) {
    return this.myRequest<Res>({ ...config, method: "PUT" });
  }
}

const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误,服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权,但是访问是被禁止的。",
  404: "服务器延迟过大，请稍后再试",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除,且不会再得到的。",
  422: "当创建一个对象时,发生一个验证错误。",
  500: "服务器延迟过大，请稍后再试",
  502: "服务器延迟过大，请稍后再试",
  503: "服务器延迟过大，请稍后再试",
  504: "服务器延迟过大，请稍后再试"
};

// 错误状态码处理：
function errorCodeHandler(msg: string = "", code?: number | string) {
  let message = "未知错误！";
  if (msg) {
    message = msg;
  } else if (code != null && codeMessage[code]) {
    message = codeMessage[code];
  }
  uniqMessage("error", message);
}

// 请求错误处理：
function errorHandler(error: any) {
  if (error.message?.includes("timeout")) {
    uniqMessage("error", "服务器延迟过大，请稍后再试");
  } else if (error.message !== "canceled") {
    errorCodeHandler("", error.response?.status);
  }
}
