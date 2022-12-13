import { memo } from "react";
import LoginPane from "./components/LoginPane";
import { LoginWapper } from "./styled";

const Login = () => {
  return (
    <LoginWapper>
      <div className="the-login-page">
        <div className="login_module">
          <div className="common left_img"></div>
          <div className="common right_login">
            <LoginPane />
          </div>
        </div>
        <div className="shadow"></div>
        <div className="copyright">
          <p>浙江水木物联技术有限公司</p>
          <p>Copyright &copy; 2022 浙江水木物联技术有限公司 v2.1.1</p>
        </div>
      </div>
    </LoginWapper>
  );
};

export default memo(Login);
