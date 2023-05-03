import { Button } from "antd";
import React from "react";

export const TransparentBtnInfo = ({ text, color, className }) => {
  let classes = className ? className : "";
  classes = classes + " tansparentbtn noborder " + color;
  return (
    <div type="primary" className={classes}>
      {text}
    </div>
  );
};
export const TransparentBtnsAction = ({ text, color, className, onClick }) => {
  let classes = className ? className : "";
  classes = classes + " tansparentbtn  " + color;
  return (
    <Button onClick={onClick} type="primary" className={classes}>
      {text}
    </Button>
  );
};
