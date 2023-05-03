import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer"
const Layouts = ({ SearchPageStyles }) => {
    const { pathname } = useLocation()
    const condition = pathname.includes("serach")
    return (
        <Fragment>
            <header
                className="navbar"
                style={{
                    backgroundColor: "white",
                    position: "fixed",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    zIndex: 1000,
                    height: "max-content",
                    borderBottom: SearchPageStyles ? '2px solid rgb(226, 226, 226)' : null
                }}
            >
                <Nav />
            </header>
            {/* content */}
            <div className="content" style={{ background: "#F5F7F9", paddingTop: SearchPageStyles ? 0 : "0" }}>
                <Outlet />
            </div>
            {/* content end */}
            {
                !condition &&
                <Footer />
            }
        </Fragment>
    );
};

export default Layouts;
