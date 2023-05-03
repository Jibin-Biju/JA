import { Layout } from "antd";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import LoaderContent from "../../../../common/Loader/content"
import { useSelector } from "react-redux";
const { Content } = Layout;

function LayoutContent() {
  const state = useSelector((state) => state.loader.isContentLoading);
  return (
    <Fragment>
      <Content className={`contentOutlet ${state ? "hide" : ""}`}>
        <LoaderContent />
        <div className="contentOutletchildWrapper section">
          <Outlet />
        </div>
      </Content>
    </Fragment>
  );
}

export default LayoutContent;
