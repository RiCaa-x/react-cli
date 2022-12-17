// import { AliasToken } from "antd/es/theme/interface";

// 此处的token没有设置类型是为了最下面能够typeof出ITheme的类型，供其他地方使用。
// export const token: Partial<AliasToken> = {
export const token = {
  colorPrimary: "#4e86e6",
  fontSize: 14,
  colorText: "#3a3f63",
  colorBorder: "#e5e6eb",
  borderRadius: 4,
  fontFamily: "SiYuan, PingFangSC-Medium, PingFang SC, NSimSun, Microsoft YaHei"
};

export const theme = {
  ...token,

  gap: "16px",
  backgroundColor: "#e9edf7",
  /** 渐变 */
  gradientColor: "linear-gradient(104deg, #4f8aff 0%, #165dff 100%)",
  gradientHoverColor: "linear-gradient(104deg, #4594ff 0%, #4172ff 100%)"
};

export type ITheme = typeof theme;
