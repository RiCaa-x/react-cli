import { MyRequest } from "..";

interface loginInfo {
  username: string;
  password: string;
}

export function _testApi(params: any) {
  return MyRequest.get({
    url: "/aps_backend/plannedJobsheetRecord/getClientIp",
    params,

    // 自定义配置：
    /**
     * 拦截器：此处只能配置responseInterceptor，因为requestInterceptor没啥用，他的参数config就是上面传给MyRequest.get的参数，完全可以在上面定义逻辑。
     */
    interceptors: {
      responseInterceptor: res => {
        // doSomething:
        return res;
      }
    },
    // 可以灵活的控制某个接口的code码，优先级最高，会替代实例/全局的code：
    code: 200,
    // 可以灵活的控制某个接口是否返回清楚明了的res，优先级最高，会替代实例/全局的clearRes：
    clearRes: true
  });
}

export function login(params: loginInfo) {
  return MyRequest.post({
    url: "/aps_backend/userinfo/v2/login",
    headers: { "Content-Type": "application/json" },
    data: params,
    clearRes: false
  });
}

export function logout() {
  return MyRequest.get({
    url: "/aps_backend/userinfo/logout",
    clearRes: false
  });
}
