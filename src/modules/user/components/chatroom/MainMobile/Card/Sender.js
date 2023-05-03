import { Avatar } from "antd"
function Sender() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginBottom: "15px"
            }}>
            <span
                className="time"
                style={{ fontWeight: "500" }}>
                {"10:16"}
            </span>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "5px",
                    marginBottom: "5px"
                }}>
                <Avatar
                    size={"large"}
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    style={{ minWidth: "40px" }} />
                <p
                    style={{
                        background: "#0094FF33",
                        padding: "10px 12px",
                        borderRadius: 15,
                        borderTopLeftRadius: "0",
                        maxWidth: "85%",
                    }}>
                    Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque. Massa tincidunt tempor a nisl eu mauris lectus. Amet lobortis auctor at egestas aenean. Rhoncus cras nunc lectus morbi duis sem diam. Sed gravida eget semper vulputate vitae.
                </p>
            </div>
        </div>
    )
}

export default Sender