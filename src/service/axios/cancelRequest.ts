import qs from "qs";

export const CancelRequest = {
  // 缓存请求的取消cancleToken，映射关系为： （接口url+params：cancleTokenFn）
  cache: new Map(),

  // 根据提供的键名 key 取消对应的请求:
  clearCacheWithKey: function (key: string, cancleRequest: boolean = false) {
    if (key) {
      const cancelToken = this.cache.get(key);
      if (cancelToken && typeof cancelToken === "function") {
        cancleRequest && cancelToken();
        this.cache.delete(key);
      }
    }
  },
  // 取消全部请求：
  clearCache: function () {
    this.cache.forEach((cacheToken: any) => {
      cacheToken();
    });
    this.cache.clear();
  }
};

// 获取某个请求拼接请求参数后的fullUrl：
export function getFullUrl(config: any) {
  let fullUrl = config.url;

  const method = config.method.toLowerCase();
  if (["get", "delete"].includes(method) && config.params && typeof config.params === "object") {
    fullUrl += qs.stringify(config.params, { addQueryPrefix: true });
  } else if (["post", "put", "patch"].includes(method) && config.data && typeof config.data === "object") {
    fullUrl += `_${qs.stringify(config.data, { arrayFormat: "brackets" })}`;
  }

  return fullUrl;
}
