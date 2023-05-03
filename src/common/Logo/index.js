
import { Grid } from "antd";
import React from "react";
import { Link } from "react-router-dom";



function Logo({ onClick, admin }) {
    return (
        admin ?
            <LogoAdmin onClick={onClick} /> :
            <LogoUser />
    )
}

export default Logo

const LogoAdmin = ({ onClick }) => {
    const breakpoints = Grid.useBreakpoint();
    const condition =
        !breakpoints["lg"] && !breakpoints["xl"] && !breakpoints["xxl"];
    return (
        <div
            className="logo"
            onClick={() => {
                onClick();
            }}
        >
            {condition ? "Ad" : "Dashboard"}

        </div>
    );
}

const LogoUser = () => {
    return (
        <Link to="/" className={'logo'}>
            <div style={{ color: "var(-primary) " }}>
            JustAsk!
            </div>
        </Link >
    )
}