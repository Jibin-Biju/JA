import { Col, Row } from "antd";
import React from "react";
import BalanceCard from "./balancecard";
import WithdrawCard from "./withdrawcard";

function BalanceRow() {
  return (
    <Row
      className="cardsrow"
      // justify={{ lg: "space-between", md: "space-between", xl: "start" }}
      gutter={[
        { xl: 40, lg: 0 },
        { sm: 15, xs: 15 },
      ]}
      style={{
        width: "100%",
        marginBottom: "25px",
      }}
    >
      <Col xxl={7} xl={9} lg={11} md={11} sm={24} xs={24}>
        <BalanceCard />
      </Col>
      <Col xxl={9} xl={12} lg={12} md={12} sm={24} xs={24}>
        <WithdrawCard />
      </Col>
    </Row>
  );
}

export default BalanceRow;
