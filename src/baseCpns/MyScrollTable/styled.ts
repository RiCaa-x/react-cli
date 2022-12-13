import { ITheme } from "@/assets/theme";
import { ACTIVE_TABLE_ROW } from "@/constants";
import styled, { ThemedStyledProps } from "styled-components";

const activeRowBg = "#f3f5f9";

type IPropsType = ThemedStyledProps<
  {
    headHeight: number;
    headerSplit?: boolean;
    bordered?: boolean;
  },
  Partial<ITheme>
>;

export const Wrapper = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  border: ${(props: IPropsType) => (props.bordered ? `1px solid ${props.theme.borderColor}` : 0)};
  border-radius: ${(props: IPropsType) => props.theme.borderRadius}px;

  .ant-table-wrapper {
    .ant-table-container {
      border-inline-start: 0 !important;
    }

    /* tableHeader: */
    .ant-table-thead {
      .ant-table-cell {
        height: ${(props: IPropsType) => props.headHeight}px;
        background-color: ${(props: IPropsType) => props.theme.backgroundColor};
        &::before {
          content: ${(props: IPropsType) => (props.headerSplit ? "" : "unset")} !important;
        }
      }
    }

    /* tableBody: */
    .ant-table-body {
      .ant-table-cell {
        height: 40px;
      }
      .${ACTIVE_TABLE_ROW} {
        .ant-table-cell {
          background-color: ${activeRowBg} !important;
        }
      }
    }

    /* 统一修改单元格： */
    .ant-table-cell {
      color: ${(props: IPropsType) => props.theme.fontColor};
      font-size: ${(props: IPropsType) => props.theme.fontSize}px;
      border-color: ${(props: IPropsType) => props.theme.borderColor} !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      border-inline-end: ${(props: IPropsType) => (props.bordered ? `1px solid ${props.theme.borderColor}` : 0)};
      /* 最后一格不需要边框： */
      &:last-of-type {
        border-inline-end: 0 !important;
      }
    }

    /* 滚动条样式： */
    .ant-table-body {
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
      }

      &::-webkit-scrollbar-thumb {
        background: #c8d1df;
        border-radius: 4px;
      }
    }
  }
`;
