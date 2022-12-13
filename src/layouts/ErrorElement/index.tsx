import { Button, Result, Tooltip } from "antd";
import { Link, useRouteError } from "react-router-dom";

const NotFound: React.FC = () => {
  const error = useRouteError();

  return (
    <Result
      status="500"
      title="500"
      subTitle={
        <Tooltip title={String(error) || ""}>
          <span>Sorry, something went wrong.</span>
        </Tooltip>
      }
      extra={
        <Button type="primary">
          <Link to={"/"}>返回首页</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
