import styled from "styled-components";

interface IPropsType {
  isCenter: boolean;
}

export const LayoutWrapper = styled.div`
  height: 100vh;
  font-size: ${props => props.theme.minFontSize + "px"};
  overflow: hidden;
  position: relative;

  .ant-layout-sider,
  .ant-menu,
  .ant-menu-dark,
  .ant-layout-sider-trigger {
    background: #222653 !important;
  }
  .ant-menu {
    width: auto;
    padding: 0 10px;
  }
  .ant-layout-header,
  .sm_logo {
  }
  .site-layout-background {
    background-color: #fff;
    height: 36px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(34, 38, 83, 0.08);
    display: flex;
    justify-content: flex-end;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    background-color: unset !important;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 0 0 10px !important;
    margin: 0;
    display: flex;
    align-items: center;
    img {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
  }
  .ant-menu-item-selected {
    background: ${props => props.theme.gradientColor};
    width: unset !important;
    border-radius: 8px;
  }
  .ant-layout-content {
    overflow: hidden;
    height: calc(100vh - 49px);
  }
  .sm_logo {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: ${(props: IPropsType) => (props.isCenter ? "center" : "unset")};
    padding-left: ${(props: IPropsType) => (props.isCenter ? 0 : "14px")};
    .logo {
      width: 47px;
      height: 39px;
    }
    .logo_text {
      width: 65px;
      height: 31px;
      margin-left: 8px;
    }
  }

  .ant-layout {
    background: #fbfbfd;
  }
`;
