import { Grid, Layout, Menu } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Logo from "../../../../common/Logo";
import { useMenuItems } from "./sideitems";
import { useLocation } from "react-router-dom";
const { Sider } = Layout;

const SideBar = () => {
  const { items } = useMenuItems(1);

  const breakpoints = Grid.useBreakpoint();
  const { pathname } = useLocation();
  const [activekey, setactivekey] = useState(pathname);
  const [open, setopend] = useState(false);
  const condition =
    !breakpoints["lg"] && !breakpoints["xl"] && !breakpoints["xxl"];
  useEffect(() => {
    setactivekey(pathname);
  }, [pathname]);
  return (
    <Fragment>
      <Sider
        width={240}
        className={"sidebar"}
        collapsedWidth={65}
        collapsible
        collapsed={condition}
      >
        <Fragment>
          <div className="logoWrapperSide">
            <Logo admin onClick={() => condition && setopend((e) => !e)} />
          </div>
          <Menu
            activeKey={activekey}
            onClick={(e) => setactivekey(e.key)}
            mode="inline"
            items={items}
          />
        </Fragment>
      </Sider>
      {condition ? (
        <Sider
          className={`sidebar smallsidebar  ${open ? "opened" : "closed"}`}
          collapsible
          collapsed={open}
          collapsedWidth={240}
        >
          <div className="logoWrapperSide">
            <Logo onClick={() => setopend((e) => false)} />
          </div>
          <Menu
            activeKey={activekey}
            onClick={(e) => setactivekey(e.key)}
            mode="inline"
            items={items}
          />
        </Sider>
      ) : null}
    </Fragment>
  );
};

export default SideBar;
