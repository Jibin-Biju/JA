import { Button, Col, Popover, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import Icons from "../../../../../common/Icons";
import { setProfile } from "../../../../../Store/Features/ProfileSlice";
function Navbar() {
  const dispatch = useDispatch()
  return (
    <Row
      className="adminNav"
      gutter={[20, 20]}
      style={{ justifyContent: "flex-end" }}
    >
      <Col xl={14} md={20} sm={24} xs={24} className="rightbar">
        <Row align={"middle"} justify={"end"}>
          <Col span={6}>
            <Popover content={"Logout"}>
              <Button type="primary" onClick={() => dispatch(setProfile(null))}>
                <Icons icon="logout" className={"organge"} />
                Logout
              </Button>
            </Popover>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Navbar;
