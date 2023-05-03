import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import Logo from "../../../../common/Logo";
import { useMenuItems } from "./sideitems";
import { useLocation } from "react-router-dom";
const { Sider } = Layout;

const SideBarFixed = ({ setopend }) => {
  const { items } = useMenuItems(2);
  const { pathname } = useLocation();
  const [activekey, setactivekey] = useState(pathname);
  useEffect(() => {
    setactivekey(pathname);
  }, [pathname]);
  return (
    <Sider className={"sidebar sidebarfixed"}>
      <div className="logoWrapperSide">
        <Logo admin onClick={() => setopend((e) => !e)} />
      </div>
      <Menu
        activeKey={activekey}
        onClick={(e) => {
          if (e.key == 10) {
            setopend(false);
          } else if (e.key == 11) {
          } else setactivekey(e.key);
          setopend(false);
        }}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideBarFixed;
