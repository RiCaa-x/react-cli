import { logout } from "@/service/api/login";
import { uniqMessage } from "@/utils";
import { UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./styled";

const UserInfo = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    await logout()
      .then(res => {
        res && navigate("/login");
      })
      .catch(err => {
        uniqMessage("error", "退出登录失败！");
      });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Space>
          <UserSwitchOutlined />
          退出登录
        </Space>
      ),
      key: "1",
      onClick: () => logOut()
    }
  ];

  return (
    <Wrapper>
      <Dropdown menu={{ items }} arrow>
        <div className="logo"></div>
        {/* <Avatar size={32} icon={<UserOutlined />} src="https://joeschmoe.io/api/v1/random" /> */}
      </Dropdown>
    </Wrapper>
  );
};

export default memo(UserInfo);
