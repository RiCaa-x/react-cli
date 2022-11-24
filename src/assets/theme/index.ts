import { AliasToken } from "antd/es/theme";

interface ITokenMust {
  colorPrimary: string;
  borderRadius: number;
}

export interface ITheme extends ITokenMust {
  gap: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  borderColor: string;
  gradientColor: string;
  gradientHoverColor: string;
}

export const token: Partial<AliasToken> & ITokenMust = {
  colorPrimary: "#4e86e6",
  borderRadius: 4
};

export const theme: ITheme = {
  ...token,
  gap: "16px",
  fontSize: 14,
  fontColor: "#3a3f63",
  backgroundColor: "#e9edf7",
  borderColor: "#dae0f2",

  /** 渐变 */
  gradientColor: "linear-gradient(104deg, #4f8aff 0%, #165dff 100%)",
  gradientHoverColor: "linear-gradient(104deg, #4594ff 0%, #4172ff 100%)"
};
