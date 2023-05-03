import { Fragment } from "react";
import { iconmap } from "./iconsMap";

function CasionDashboardIcons({ dir, text, icon, onClick, className, styles }) {
  const handleclick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  const Deposit = () => {
    return (
      <div className="groupicon">
        <span className="first">
          {iconmap["deposit"]}
          <span className="second">{iconmap["down"]}</span>
        </span>
      </div>
    );
  };
  const WithDraw = () => {
    return (
      <div className="groupicon">
        <span className="first">
          {iconmap["withdraw"]}
          <span className="second" style={{ left: "-70%" }}>
            {iconmap["up"]}
          </span>
        </span>
      </div>
    );
  };
  return (
    <div
      className={`${className} ${dir} CasionDashboardIcons`}
      onClick={handleclick}
      style={styles}
    >
      {icon !== "group deposit" && icon !== "group withdraw" ? (
        <Fragment>
          {iconmap[icon]}
          {icon === "bell" ? iconmap["dot"] : null}
          {text ? <div className={`icontext ${dir}`}>{text}</div> : null}
        </Fragment>
      ) : (
        <>
          <Fragment>{icon === "group deposit" && <Deposit />}</Fragment>
          <Fragment>{icon === "group withdraw" && <WithDraw />}</Fragment>
        </>
      )}
    </div>
  );
}

export default CasionDashboardIcons;
