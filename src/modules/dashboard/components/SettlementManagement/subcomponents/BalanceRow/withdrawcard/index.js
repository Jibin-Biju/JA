import React from "react";
import { Row, Col, Typography, Button } from "antd";
import Icons from "../../../../../../../common/Icons";
import {
  // TransparentBtnInfo,
  TransparentBtnsAction,
} from "../../../../../../../common/Buttons";
function WithdrawCard() {
  return (
    <Row className="card   withdrawcard" gutter={[0, 15]}>
      <Col span={24}>
        <Typography>
          <Typography.Title level={1} className="m0 title">
            {("Withdraw")}
          </Typography.Title>
        </Typography>
      </Col>
      <Col span={24}>
        <Typography>
          <Typography.Text className="paragraph">
            {(
              "Plase make the payment to start enjoying all the features of our premuim plan as soon as possible."
            )}
          </Typography.Text>
        </Typography>
      </Col>

      <Col span={24} className="ulcol">
        <BalSTatus
          text={("Head Office Profit Balance")}
          price={"1699.0"}
          bg="green"
        />
        <BalSTatus text={("Enter the amount to withdraw")} bg="purple" />
        <BalSTatus text={"100,000"} />
      </Col>
      <Col span={24} className="buttoncol">
        <Button type="primary">
          {("Withdraw Profit")}
        </Button>
      </Col>
    </Row>
  );
}

const BalSTatus = ({ text, price, bg }) => {
  const p = parseFloat(price);
  const pricee = p ? `$ ${price}` : "";
  return (
    <Row
      justify={"space-between"}
      gutter={[20, 15]}
      align={"top"}
      style={{ marginBottom: ".8rem" }}
      className={p ? "shadow" : ""}
    >
      <Col span={p ? 16 : 24}>
        <Typography>
          <Typography.Text level={1} className="m0 flex">
            {bg ? (
              <Icons icon={"circle"} className={`icons ${bg}`} />
            ) : (
              <img src="/assets/coin.svg" alt="" />
            )}
            {text || "Total Balance"}
          </Typography.Text>
        </Typography>
      </Col>
      {p ? (
        <Col span={8}>
          {/* <Typography.Title
              style={{ opacity: p ? 1 : 0 }}
              level={5}
              className="m0"
              ellipsis={{ rows: 1, tooltip: true }}
            >
              {pricee}
            </Typography.Title> */}
          <TransparentBtnsAction
            onClick={() => { }}
            className="orange"
            text={pricee}
          />
        </Col>
      ) : null}
    </Row>
  );
};

export default WithdrawCard;
