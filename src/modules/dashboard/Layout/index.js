import { Grid, Layout } from "antd";
import UserDrawer from "./Sider";
import SideBarFixed from "./Sider/SiderFixed";
import NavBar from "./Nav/Navbar";
import NavMobile from "./Nav/NavMobile";
import { Fragment, useState } from "react";
import LayoutContent from "./content";

const { Header, Sider } = Layout;
function AdminLayout() {

  const [open, setopen] = useState(false);
  const breakpoints = Grid.useBreakpoint();
  const condition = breakpoints["sm"];
  return (
    <Layout className="layout adminlayout nav">
      {condition ? (
        <Fragment>
          <Sider width={240}>
            <UserDrawer />
          </Sider>
          <Layout>
            <Header>
              <NavBar />
            </Header>
            <LayoutContent />
          </Layout>
        </Fragment>
      ) : (
        <Fragment>
          {open ? (
            <Sider className="sidebarfixedwrappersider">
              <SideBarFixed setopend={setopen} />
            </Sider>
          ) : null}
          <Layout>
            <Header>
              <NavMobile setopen={setopen} />
            </Header>
            <LayoutContent />
          </Layout>
        </Fragment>
      )}
    </Layout>
  );
}

export default AdminLayout;
