import moment from "moment";

function Reciver({ item }) {
  return (
    <div className="MessageReciver" >
      <p className="MessageReciverText" >
        {item.text}
      </p>
      <div className="time" style={{ marginLeft: "auto" }}>
        {moment(item?.createdAt).fromNow()}
      </div>
    </div>
  );
}

export default Reciver;
