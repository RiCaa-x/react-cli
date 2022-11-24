import logo from "@/assets/pngs/logo.png";
import logoText from "@/assets/pngs/logo_text.png";
import { renderMenu } from "@/router/lib";
import { useAppSelector } from "@/store/hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutWrapper } from "./styled";
import UserInfo from "./UserInfo";
const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = () => {
  // 动态路由：
  const { dynamicRoutes } = useAppSelector(state => state.globalReducer);

  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [selectKey, setSelectKey] = useState(["/"]);
  useEffect(() => {
    location.pathname && setSelectKey([location.pathname]);
  }, [location.pathname]);

  const routeChange = ({ key }: any) => {
    if (!key) return;
    navigate(key);
  };

  return (
    <LayoutWrapper isCenter={collapsed}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible={true}
          collapsedWidth={64}
          collapsed={collapsed}
          trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onCollapse={value => setCollapsed(value)}>
          <div className="sm_logo">
            <img className="logo" src={logo} alt="logo" />
            {!collapsed && <img className="logo_text" src={logoText} alt="text" />}
          </div>
          <Menu
            theme="dark"
            selectedKeys={selectKey}
            mode="inline"
            items={renderMenu(dynamicRoutes)}
            onSelect={routeChange}
          />
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <UserInfo />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

export default MyLayout;
