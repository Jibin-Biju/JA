import { Avatar } from "antd"

function Reciver() {
    return (
        <div
            style={{
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginBottom: "15px"
            }}>
            <div style={{ marginLeft: "auto", fontWeight: "500" }}>
                {"10:16"}
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "5px",
                    marginBottom: "5px"
                }}>
                <p
                    style={{
                        background: "rgba(0, 0, 0, 0.1)",
                        padding: "10px 12px",
                        borderRadius: 15,
                        borderTopRightRadius: "0",
                        maxWidth: "85%",
                    }}>
                    Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque. Massa tincidunt tempor a nisl eu mauris lectus. Amet lobortis auctor at egestas aenean. Rhoncus cras nunc lectus morbi duis sem diam. Sed gravida eget semper vulputate vitae.
                </p>
                <Avatar
                    size={"large"}
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    style={{ minWidth: "40px" }} />
            </div>

        </div>
    )
}

export default Reciver