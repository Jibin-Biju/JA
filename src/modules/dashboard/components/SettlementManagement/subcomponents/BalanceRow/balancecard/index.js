import React from "react";
import { Row, Col, Typography } from "antd";
import Icons from "../../../../../../../common/Icons";
function BalanceCard() {
  return (
    <Row className="card balancecard" gutter={[0, 0]}>
      <Col span={24} className="balancecol">
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col span={16}>
            <Typography>
              <Typography.Title level={1} className="m0">
                $ 9.470
              </Typography.Title>

              <Typography.Title
                level={5}
                className="m0"
                style={{ textAlign: "left" }}
              >
                Active Balance
              </Typography.Title>
            </Typography>
          </Col>
          <Col span={8}>
            <Typography>
              <Typography.Title level={5} className="m0">
                Balance
              </Typography.Title>
            </Typography>
          </Col>
        </Row>
      </Col>
      <Col span={24} className="ulcol">
        <BalSTatus text={("Total Balance")} price={"1699.0"} />
        <BalSTatus text={("Balance on Hand")} price={"-1699.0"} />
        <BalSTatus text={("Distributor Revenue Balance")} price={"-1699.0"} />
      </Col>
      <Col span={24} className="buttoncol">
        {/* <Button
          type="primary"
          icon={<Icons icon={"arrowright"} />}
        >
          More Details
        </Button> */}
      </Col>
    </Row>
  );
}

const BalSTatus = ({ text, price }) => {
  const p = parseFloat(price);
  return (
    <Row
      justify={"space-between"}
      gutter={[10, 10]}
      align={"top"}
      style={{ marginBottom: ".8rem" }}
    >
      <Col span={16}>
        <Typography>
          <Typography.Text level={1} className="m0 flex">
            <Icons
              icon={p > 0 ? "arrowup" : "arrowdown"}
              className={`icons ${p > 0 ? "up" : "down"}`}
            />
            {text || "Total Balance"}
          </Typography.Text>
        </Typography>
      </Col>
      <Col span={8}>
        <Typography>
          <Typography.Title
            level={5}
            className="m0"
            ellipsis={{ rows: 1, tooltip: true }}
          >
            $ {" " + price || "1699.0"}
          </Typography.Title>
        </Typography>
      </Col>
    </Row>
  );
};

export default BalanceCard;
