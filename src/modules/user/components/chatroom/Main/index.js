import { useState, useRef, Fragment } from "react";
import { Typography, Layout, Form, Input } from "antd";
import { IoSend } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

import Reciver from "./Card/Sender";
import Sender from "./Card/Reciver";

import { useEffect } from "react";
import MainMobile from "../MainMobile"
import LoaderContent from "../../../../../common/Loader/content";
const { Title, Text } = Typography;
const { Header, Footer, Content } = Layout;

const ChatRoomMain = ({
  setactive,
  socket,
  active,
  openChat,
  online,
  room,
  setopenChat,
  isDesktop,
  handleReRender
}) => {
  const bottomRef = useRef(null);
  const [MainTextField, setMainTextField] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const profileID = localStorage.getItem("ProfileID");
  const [form] = Form.useForm();

  const onSubmit = (e) => {
    if (MainTextField == "") {
    }
    const users = room.split("@!@!2!@!@");

    let localData;

    localData = {
      sender: { _id: profileID },
      receiver: {
        _id: users[1] == profileID ? users[0] : users[1],
      },
      text: MainTextField,
      createdAt: new Date(),
      room: room,
    };
    setMessages((messages) => [...messages, localData]);

    // setopenChat({
    //   ...openChat, // Copy the old fields
    //   messages: [...openChat.messages, localData], // But override this one
    // });
    setMainTextField("");
    form.resetFields();
    socket.emit("send_message", {
      data: localData,
      room: room,
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Recieve", data);
      console.log("room", localStorage.getItem("room"));
      console.log(data.room);
      if (data.room == localStorage.getItem("room")) {
        console.log("room data changed");

        setMessages((messages) => [...messages, data]);
      }
    });
  }, [socket, openChat]);

  useEffect(() => {
    console.log("render message");

    setMessages([]);
    getInboxDataMessages();
  }, [active]);

  const getInboxDataMessages = async () => {

  };
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    // useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };


  return (
    <Fragment>
      {
        isDesktop ?
          <MAIN
            setactive={setactive}
            openChat={openChat}
            online={online}
            profileID={profileID}
            loading={loading}
            bottomRef={bottomRef}
            messages={messages}
            onSubmit={onSubmit}
            form={form}
            setMainTextField={setMainTextField}
            MainTextField={MainTextField}
            AlwaysScrollToBottom={AlwaysScrollToBottom}
          />
          : <MainMobile active={active} setactive>
            <MAIN
              setactive={setactive}
              openChat={openChat}
              online={online}
              profileID={profileID}
              loading={loading}
              bottomRef={bottomRef}
              messages={messages}
              onSubmit={onSubmit}
              form={form}
              setMainTextField={setMainTextField}
              MainTextField={MainTextField}
              AlwaysScrollToBottom={AlwaysScrollToBottom}
              mobile
            />
          </MainMobile>
      }
    </Fragment>
  );
};

const MAIN = ({
  setactive,
  openChat,
  online,
  profileID,
  loading,
  bottomRef,
  messages,
  onSubmit,
  form,
  setMainTextField,
  MainTextField,
  AlwaysScrollToBottom,
  mobile
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const mobileLoadingstlyes = {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
    zIndex: "10",
    background: "white"
  }
  const desktopLoadingStyles = {
    position: "absolute",
    left: "0",
    top: "-200px",
    width: "100%",
    maxWidth: "75%",
    minHeight: "300px",
    display: "grid",
    placeContent: "center",
    zIndex: "1",
  }

  const EmptyMessageCenter =
    <Typography className="EmptyMessageCenter">
      <Text>    No Messages Yet!   </Text>  </Typography>
  return (
    <Layout
      className={`ChatRoomMain  ${mobile ? "" : undefined}`}>
      <Header className="Chat_TobBar" >
        <Typography>
          <Title level={3} style={{ marginBottom: 0, fontWeight: "bold" }}>
            {online ? (
              <GoPrimitiveDot color="#00FF38" style={{ marginRight: "6px" }} />
            ) : (
              <GoPrimitiveDot color="red" style={{ marginRight: "6px" }} />
            )}

            {
              openChat?.sender?._id === profileID
                ? openChat?.receiver?.name
                : openChat?.sender?.name}
          </Title>
        </Typography>
        <Typography>
          <Title level={4}>
            <BiArrowBack
              cursor={"pointer"}
              onClick={() => {
                setactive("");
              }}
            />
          </Title>
        </Typography>
      </Header>
      <Content
        className={`ChatContent ${mobile ? "ChatContentMobile" : undefined}`}
        ref={bottomRef}>
        <div
          style={{
            zIndex: loading ? "-1" : "1",
            minHeight: loading ? "0px" : undefined,
            overflow: loading ? "hidden" : undefined,
          }}
        >
          {
            messages?.length === 0 && !loading ? EmptyMessageCenter : null
          }
          {messages.map((item, i) => (
            <>
              {item.sender?._id === profileID ? (
                <Sender key={i} item={item} />
              ) : (
                <Reciver openChat={openChat} key={i} item={item} />
              )}
            </>
          ))}
        </div>
        <AlwaysScrollToBottom />
      </Content>
      {loading ? (
        <Content style={{ position: "relative" }}>
          <div
            style={mobile ? mobileLoadingstlyes : desktopLoadingStyles}
          >
            <LoaderContent noShadow smaller />
          </div>
        </Content>
      ) : null}
      <Footer className="ChatFooter">
        <Form name="Main" className="MainForm" onFinish={onSubmit} form={form}>
          <Form.Item style={{ flex: 1 }} name="search">
            <Input
              className="ChatSearchBar"
              placeholder="Send Message"
              name="textfield"
              value={MainTextField}
              onChange={(e) => setMainTextField(e.target.value)}
              size="large"
              style={{ padding: "12px 15px" }}
              suffix={
                <IoSend
                  color={"var(--blue)"}
                  cursor="pointer"
                  fontSize={"1.4rem"}
                  onClick={onSubmit}
                />
              }
            />
          </Form.Item>
        </Form>
      </Footer>
    </Layout>
  )
}

export default ChatRoomMain;