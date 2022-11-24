import { Button, Checkbox, Form, Input } from "antd";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { REMEMBER_LOGIN, TOKEN, USER_INFO } from "@/constants";
import { getHomePath } from "@/router/lib";
import { getDynamicRoutes } from "@/router/lib/temporaryData";
import { login } from "@/service/api/login";
import { changeDynamicRoutes, clearGlobalStore, defaultHomePath } from "@/store/globalReducer";
import { useAppDispatch } from "@/store/hooks";
import { uniqMessage } from "@/utils";
import { localCache } from "@/utils/cache";

const LoginPane = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loginData = localCache.getCache(REMEMBER_LOGIN);
    localCache.clearCache(); // 清除缓存
    dispatch(clearGlobalStore()); // 清除globalStore
    if (loginData) {
      localCache.setCache(REMEMBER_LOGIN, loginData);
      form.setFieldsValue({
        username: loginData.username,
        password: loginData.password,
        remember: loginData.remember
      });
    }
  }, []);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    let res: any = null;
    try {
      res = await login({ username: values.username, password: values.password });
    } catch {}
    if (res?.success) {
      // 记住密码：
      values.remember
        ? localCache.setCache(REMEMBER_LOGIN, values)
        : localCache.removeCache(REMEMBER_LOGIN);
      const userInfo = {
        username: res?.data?.actualName || ""
      };
      localCache.setCache(TOKEN, "111");
      localCache.setCache(USER_INFO, userInfo);

      let homePath = defaultHomePath;
      // 按需添加动态路由：
      const dynamicRoutes = getDynamicRoutes();
      if (dynamicRoutes) {
        dispatch(changeDynamicRoutes(dynamicRoutes));
        const newHomePath = getHomePath(dynamicRoutes);
        newHomePath && (homePath = newHomePath);
      }
      uniqMessage("success", "登录成功!");
      navigate(homePath);
    } else {
      uniqMessage("error", res.message || "登录失败!");
    }
    setLoading(false);
  };

  return (
    <div className="login-pane">
      <div className="login-pane-inside-box">
        <div className="the-title">欢迎登录</div>
        <p className="sub_title">浙江航民股份有限公司</p>
        <Form layout="vertical" form={form} name="login" onFinish={onFinish} className="forms">
          <Form.Item
            className="the-form-item"
            label="账号"
            name="username"
            rules={[{ required: true, message: "账号不能为空" }]}
            getValueFromEvent={val => {
              return val.target.value.replace(" ", "");
            }}>
            <Input className="input" placeholder="请输入账号" allowClear autoComplete="off" />
          </Form.Item>
          <Form.Item
            className="the-form-item"
            label="密码"
            name="password"
            rules={[{ required: true, message: "密码不能为空" }]}
            getValueFromEvent={val => {
              return val.target.value.replace(" ", "");
            }}>
            <Input.Password className="input" placeholder="请输入密码" autoComplete="off" />
          </Form.Item>
          <Form.Item className="remember-account" name="remember" valuePropName="checked">
            <Checkbox>记住账号密码</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(LoginPane);
