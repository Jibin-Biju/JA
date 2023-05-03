import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "antd";
import LeftBar from "./LeftBar";
import Main from "./Main";
import io from "socket.io-client";
import { KEYS } from "../../../../config/keys";

const socket = io.connect(KEYS.api);

const ChatRoom = () => {
  const [active, setactive] = useState("");
  const [openChat, setopenChat] = useState(null);
  const [room, setRoom] = useState("");
  const [list, setList] = useState([]);
  const [online, setOnline] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767);

  const resverseNavigate = () => {
    if (window.innerWidth > 767) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  };


  const handleReRender = (data) => {
    setopenChat(data); // state change will re-render parent
  };
  useEffect(() => {

    window.addEventListener("load", resverseNavigate);
    window.addEventListener("resize", resverseNavigate);
    resverseNavigate();

    return () => {
      setactive("");

      localStorage.removeItem("room");
      window.removeEventListener(
        "beforeunload",
        window.history.replaceState({}, document.title)
      );
      window.removeEventListener("load", resverseNavigate);
      window.removeEventListener("resize", resverseNavigate);
    };
  }, []);


  return (
    <Row className="ChatRoom" style={{ overflowY: isDesktop ? undefined : "hidden" }}>
      <Fragment>
        <Col xl={6} lg={7} md={9} xs={24} sm={24}>
          <LeftBar
            socket={socket}
            active={active}
            setactive={setactive}
            setopenChat={setopenChat}
            setRoom={setRoom}
            setList={setList}
            list={list}
          />
        </Col>

        {active ? (
          <Col
            xl={18}
            lg={17}
            md={15}
            xs={24}
            sm={24}
            className="messagePopup"
          >
            <Main
              socket={socket}
              active={active}
              setactive={setactive}
              openChat={openChat}
              setopenChat={setopenChat}
              room={room}
              setOnline={setOnline}
              online={online}
              isDesktop={isDesktop}
              handleReRender={handleReRender}
            />
          </Col>
        ) : isDesktop ? (
          <Col
            xl={18}
            lg={17}
            md={15}
            xs={24}
            sm={24}
            className="messagePopup"
            style={{
              display: "grid",
              placeContent: "center",
              height: "100%",
              width: "100%",
              fontWeight: "bolder",
              background: "white",
              fontSize: "large",
            }}
          >
            Click on any chat to view Messages
          </Col>
        ) : null}
      </Fragment>
    </Row>
  );
};

export default ChatRoom;