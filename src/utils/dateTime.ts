import dayjs from "dayjs";

// 获取最近n天 [前n天的00:00:00, now]：
export function getPrevDayRange(n: number = 1, format: string = "YYYY-MM-DD") {
  const now = dayjs().format(format); // 当前时间
  const prevDay = dayjs().subtract(n, "days").format(format); // 前一天时间
  return [prevDay, now];
}

export function getGoodTime(time: any, format: string = "YYYY-MM-DD HH:mm:ss") {
  return time ? dayjs(time).format(format) : "";
}

// 获取之后的n天：
export function getNextDay(time: any, n: number = 1, format: string = "YYYY-MM-DD") {
  let resDate = "";

  if (time) {
    resDate = dayjs(time).add(n, "days").format(format);
  }

  return resDate;
}

export function getTimeStamp(time: any) {
  return time ? dayjs(time).valueOf() : 0;
}

/** 获取最近的n天:  */
export function getLatestDays(n: number = 1, format: string = "YYYY-MM-DD HH:mm:ss", isNow: boolean = false) {
  const startTime = dayjs().subtract(n, "days").startOf("days").format(format);
  const endTime = dayjs().endOf("days").format(format);
  const now = dayjs().format(format); // 当前时间

  return <const>[startTime, isNow ? now : endTime];
}
