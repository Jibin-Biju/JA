import { Avatar } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";
function Sender({ item, openChat }) {
  const { viewer } = useParams()
  const profileID = viewer?.id;

  return (
    <div className="MessageSender">
      {openChat.sender?._id === profileID && (
        <Avatar
          size={"large"}
          src={null}
          style={{ minWidth: "40px" }}
        />

      )}

      <div className="MessageSenderTextWrapper">
        <span className="time" >{moment(item?.createdAt).fromNow()}</span>
        <p className="MessagSenderText">  {item.text} </p>
      </div>
    </div>
  );
}

export default Sender;
