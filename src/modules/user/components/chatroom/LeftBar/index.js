import { Typography, List, Form, Select, Avatar } from "antd";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

const { Title } = Typography;

const LeftBar = ({
  active,
  setactive,
  socket,
  setopenChat,
  setRoom,
  setList,
  list,
}) => {
  const location = useLocation();
  const [initLoading, setInitLoading] = useState(true);
  const [listFilter, setListFilter] = useState([]);
  const profileID = "";

  useEffect(() => {
    fetchAllDATA();
  }, []);
  useEffect(() => {
    let chatData = location.state;
    if (chatData) {
      if (localStorage.getItem("room") === null) {
        localStorage.setItem("room", profileID + "@!@!2!@!@" + chatData.id);
      }
    }
  }, [location]);

  const getFollowersData = async () => {
    setList([
      {
        sender: {
          _id: "1233",
          name: "Test user",
          profile: undefined

        }
      }
    ])
  };

  const getInboxData = async () => {

  };
  const fetchAllDATA = async () => {
    await getInboxData();
    await getFollowersData();
    setInitLoading(false);
  };

  const dataSet = (item, i) => {

    let roomName;
    if (item.sender?._id === profileID) {
      roomName = item.room;
      setactive(item.receiver?._id);
      setopenChat(item);
    } else {
      roomName = item.room;
      setactive(item.sender?._id);
      setopenChat(item);
    }
    setRoom(roomName);
    localStorage.setItem("room", roomName);
    socket.emit("room", { room: roomName });
    socket.on("joined", (data) => {
      console.log("i have joined", data.room);
    });
  };




  return (
    <div className="ChatRoomLeftBar flex">
      <Form name="basic" className="SearchForm flex1">
        <Form.Item name="search" style={{ margin: "0 10px 30px 10px" }}>
          <Select
            className="ChatSearchBar"
            placeholder="Search for users"
            allowClear
            showArrow={false}

            onDeselect={() => setactive(null)}
            dropdownClassName="ChatSearchBarDropDown"
            value={active ? active : undefined}
            onChange={(e) => {
              if (active !== e) {

                const find_user_role = listFilter.find((a) => a?._id == e);
                const find = list?.find(
                  (a) =>
                    a?.sender?._id === e ||
                    a?.receiver?._id === e
                );
                let localData;
                if (!find) {
                  setactive(e);
                  localData = {
                    sender: profileID,
                    receiver: {
                      _id: e,
                      name: find_user_role?.name,
                      profilepic: find_user_role?.profilepic,
                    },
                    room: profileID + "@!@!2!@!@" + e,
                    messages: [],
                  };
                  setList((list) => [localData, ...list]);
                  dataSet(localData, 1);
                } else {
                  dataSet(find, 1);
                }
              }
            }}

            optionFilterProp="children"
            showSearch
            filterOption={(input, option) =>
              (option?.children?.props?.children[1].props?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {listFilter?.map(
              (e, i) =>
              (
                <option value={e?._id} key={i}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}>
                    <Avatar src={undefined} />
                    <h4 style={{ marginBottom: "0" }}>
                      {e?.name}
                    </h4>
                  </span>
                </option>
              )
            )}
          </Select>
        </Form.Item>
      </Form>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        className="ChatList flex9"
        dataSource={list}
        renderItem={(item, i) => (
          <>
            {item?.sender?._id === profileID ? (
              <List.Item
                id={item?.receiver?._id}
                key={"chat" + i}
                className={`chatItem ${active ===
                  (item?.receiver?._id)
                  ? "activeChat"
                  : undefined
                  } `}
                onClick={() => {
                  dataSet(item, 1);
                }}
              >
                <List.Item.Meta
                  className="imageAndName"
                  avatar={
                    <Avatar src={undefined} />
                  }
                  title={
                    <Typography>
                      <Title level={5} ellipsis style={{ marginBottom: "0" }}>
                        {item.receiver.name}
                      </Title>
                    </Typography>
                  }
                />
                {item?.messages.length !== 0 ? (
                  <div className="dateAndtime">
                    {moment(
                      item.messages[item.messages.length - 1].createdAt
                    ).fromNow()}
                  </div>
                ) :
                  <div className="dateAndtime">
                    {"-"}
                  </div>
                }
              </List.Item>
            ) : (
              <List.Item
                id={item?.sender?._id}
                key={"chat" + i}
                className={`chatItem ${active === (item?.sender?._id)
                  ? "activeChat"
                  : undefined
                  } `}
                onClick={() => {
                  dataSet(item, 1);
                }}
              >
                <List.Item.Meta
                  className="imageAndName"
                  avatar={
                    <Avatar src={undefined} />
                  }
                  title={
                    <Typography>
                      <Title level={5} ellipsis style={{ marginBottom: "0" }}>
                        {item.sender.name}
                      </Title>
                    </Typography>
                  }
                />
                {item?.messages?.length !== 0 ? (
                  <div className="dateAndtime">
                    {moment(new Date()).fromNow()}
                  </div>
                ) :
                  <div className="dateAndtime">
                    {"-"}
                  </div>
                }
              </List.Item>
            )}
          </>

        )}
      />
    </div >
  );
};

export default LeftBar;