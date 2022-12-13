import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="页面被外星人抓走了！"
    extra={
      <Button type="primary">
        <Link to={"/"}>返回首页</Link>
      </Button>
    }
  />
);

export default NotFound;
