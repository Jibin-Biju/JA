import { Row, Spin } from "antd";
import { useSelector } from "react-redux";

function LoaderContent() {
  const state = useSelector((state) => state.loader.isContentLoading);
  if (!state) return null;
  return (
    <Row className="loader content">
      <Spin size="large" className="spinner" />
    </Row>
  );
}

export default LoaderContent;
