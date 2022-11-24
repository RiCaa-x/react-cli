import { EMPTY_PLACE_HOLDER } from "@/constants";
import { message } from "antd";

// 单一notification：
export function uniqMessage(
  type: "open" | "success" | "error" | "info" | "warning",
  msg: string = "",
  destroyPrev: boolean = true
) {
  // 中断请求的报错不提示：
  if (msg === "canceled") return;

  if (destroyPrev) {
    message.destroy();
  }
  message[type]((msg || "未知错误！") as any);
}

export function getObjectFinalValue(obj: any, str: string) {
  if (!obj || JSON.stringify(obj) === "{}") {
    return undefined;
  }
  if (!str) {
    throw new Error("getObjectFinalValue():没有传递第二个参数");
  }
  let arr = str.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  let newObj = obj;
  for (let i of arr) {
    newObj = newObj[i];
    if (typeof newObj != "number" && !newObj) {
      return undefined;
    }
  }
  return newObj;
}

// 提取中文：
export function getChinese(str: string) {
  return str.match(/[\u4e00-\u9fa5]/g)?.join("") || "";
}

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isFunction = (value: unknown): value is Function => typeof value === "function";

function judgeUrl(url: string = "") {
  let resUrl = "";
  if (url && url !== "/") {
    resUrl = url.startsWith("/") ? url : "/" + url;
  }
  return resUrl;
}
// 拼接几个Url
export function spliceUrl(firstUrl: string = "", ...otherUrls: string[]) {
  let fullUrl = judgeUrl(firstUrl);

  otherUrls.forEach(item => {
    const realyItem = judgeUrl(item);
    fullUrl += realyItem;
  });

  return fullUrl;
}

// 判断空数据，及补充单位：
export function judgeEmpty(data: string | number | null | undefined, unit: string = "") {
  if (data || data === 0) {
    return data + unit;
  } else {
    return EMPTY_PLACE_HOLDER;
  }
}
