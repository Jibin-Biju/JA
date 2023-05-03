import { Avatar, Col, Row, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endpoints } from "../../config/endpoints";
import { KEYS } from "../../config/keys";
import { POSTREQUEST } from "../../config/requests";
import { setData } from "../../Store/Features/DataSlice";
import { TransparentBtnsAction } from "../Buttons";
import useSwal from "../Errors/SwalCall";

function useColumns(status) {
    const [columns, setcolumns] = useState([])
    const [data, setdata] = useState([])
    const [active, setactive] = useState(false)
    const tabledata = useSelector(state => state.data.data)
    useEffect(() => {
        if (status === "notice") {
            const cols = [
                {
                    title: "Sr#",
                    dataIndex: "serial",
                    key: "serial",
                    render: (text) => {
                        return (
                            <Tooltip placement="topLeft" title={text}>
                                <div className="serial">{text || "1"}</div>
                            </Tooltip>
                        );
                    },
                    width: 60,
                },
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    render: (name) => {
                        return (
                            <Typography>
                                <Typography.Title
                                    className="name"
                                    level={5}
                                    ellipsis={{ rows: 1 }}
                                >
                                    {name}
                                </Typography.Title>
                            </Typography>
                        );
                    },
                    width: 120,
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    render: (date) => <div className="date">{date}</div>,
                    key: "date",
                    width: 150,
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 160,

                    render: (email) => (
                        <Tooltip placement="topLeft" title={email}>
                            <div className="amount amount"> {email}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Message",
                    dataIndex: "message",
                    key: "message",
                    ellipsis: { showTitle: true, },
                    width: 200,
                    render: (message) => (
                        <Tooltip placement="topLeft" title={message}>
                            <div className="account amount">{message}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Completed",
                    dataIndex: "completed",
                    key: "completed",
                    ellipsis: { showTitle: true, },
                    width: 110,
                    render: (completed) => (
                        completed?.completed ? <Tooltip placement="topLeft" title={completed}>
                            <div className="account amount">{completed}</div>
                        </Tooltip>
                            :
                            <TransparentBtnsAction className="green" text={"complete"} onClick={() => setcomplete(completed)} />
                    ),
                },

            ];
            setcolumns(cols)
            const d = tabledata?.map((e, i) => {
                return {
                    serial: i + 1,
                    key: i + 1,
                    name: e?.username,
                    date: new Date(e?.createdAt).toDateString(),
                    email: e?.email,
                    message: e?.message,
                    completed: e?._id,
                }
            })
            setdata(d)
        }
        else if (status === "user" || status === "post") {
            const cols = [
                {
                    title: "Sr#",
                    dataIndex: "serial",
                    key: "serial",
                    render: (text) => {
                        return (
                            <Tooltip placement="topLeft" title={text}>
                                <div className="serial">{text || "1"}</div>
                            </Tooltip>
                        );
                    },
                    width: 50,
                },
                {
                    title: "Author",
                    dataIndex: "name",
                    key: "name",
                    render: ({ name, img }) => {
                        return (
                            <Row align={"middle"} gutter={[15, 5]} className="nameavatar">
                                <Col span={5}>
                                    <Avatar src={KEYS.api + img} />
                                </Col>
                                <Col span={17}>
                                    <Typography>
                                        <Typography.Title
                                            className="name"
                                            level={5}
                                            ellipsis={{ rows: 1 }}
                                        >
                                            {name}
                                        </Typography.Title>
                                    </Typography>
                                </Col>
                            </Row>
                        );
                    },
                    width: 150,
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    render: (date) => <div className="date">{date}</div>,
                    key: "date",
                    width: 150,
                },
                {
                    title: "Id",
                    dataIndex: "id",
                    key: "id",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 150,

                    render: (id) => (
                        <Tooltip placement="topLeft" title={id}>
                            <div className="amount" > {id}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Total Likes",
                    dataIndex: "likes",
                    key: "likes",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 90,

                    render: (likes) => (
                        <Tooltip placement="topLeft" title={likes}>
                            <div className="amount" > {likes || 0}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Total Comments",
                    dataIndex: "comments",
                    key: "comments",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 90,

                    render: (qno) => (
                        <Tooltip placement="topLeft" title={qno}>
                            <div className="amount" > {qno}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: ("Actions"),
                    dataIndex: "result",
                    key: "result",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 150,
                    render: (result) => {
                        return (
                            <Row
                                className="result amount"
                                justify={"space-between"}
                                align={"middle"}
                            >
                                <Col span={24} className="transparent red">
                                    <TransparentBtnsAction onClick={() => deletepost(result)} className="red" text={"delete"} />
                                </Col>
                            </Row>
                        );
                    },
                },
            ];
            const colsusers = [
                {
                    title: "Sr#",
                    dataIndex: "serial",
                    key: "serial",
                    render: (text) => {
                        return (
                            <Tooltip placement="topLeft" title={text}>
                                <div className="serial">{text || "1"}</div>
                            </Tooltip>
                        );
                    },
                    width: 50,
                },
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    render: ({ name, img }) => {
                        return (
                            <Row align={"middle"} gutter={[15, 5]} className="nameavatar">
                                <Col span={5}>
                                    <Avatar src={KEYS.api + img} />
                                </Col>
                                <Col span={17}>
                                    <Typography>
                                        <Typography.Title
                                            className="name"
                                            level={5}
                                            ellipsis={{ rows: 1 }}
                                        >
                                            {name}
                                        </Typography.Title>
                                    </Typography>
                                </Col>
                            </Row>
                        );
                    },
                    width: 150,
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    render: (date) => <div className="date">{date}</div>,
                    key: "date",
                    width: 150,
                },
                {
                    title: "Id",
                    dataIndex: "id",
                    key: "id",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 200,

                    render: (id) => (
                        <Tooltip placement="topLeft" title={id}>
                            <div className="amount" > {id}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: ("Actions"),
                    dataIndex: "result",
                    key: "result",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 150,
                    render: (result) => {
                        return (
                            <Row
                                className="result amount"
                                justify={"space-between"}
                                align={"middle"}
                            >
                                <Col span={24} className="transparent red">
                                    <TransparentBtnsAction onClick={() => deleteuser(result)} className="red" text={"delete"} />
                                </Col>
                            </Row>
                        );
                    },
                },
            ];

            if (status === "user") {
                const find = cols.findIndex(e => e.dataIndex === "id")
                const newarr = cols.slice(0, find);
                newarr.push(
                    {
                        title: "Total Posts",
                        dataIndex: "posts",
                        key: "posts",
                        ellipsis: {
                            showTitle: false,
                        },
                        width: 90,

                        render: (posts) => (
                            <Tooltip placement="topLeft" title={posts}>
                                <div className="amount" > {posts}</div>
                            </Tooltip>
                        ),
                    },
                )
                newarr.push(columns.slice(find + 1, 20))
            }
            setcolumns(status === "user" ? colsusers : cols)

            const d = tabledata?.map((e, i) => {
                let commentcount = 0;
                e?.Comments?.forEach(a => {
                    commentcount++;
                    a?.reply?.map(e => commentcount++)
                })
                return {
                    serial: i + 1,
                    key: i + 1,
                    name: { name: e?.name || e?.Author?.name, img: e?.profile || e?.Author?.profile },
                    date: new Date(e?.createdAt).toDateString(),
                    likes: e?.Likes?.count,
                    comments: commentcount,
                    id: e?._id,
                    result: e?._id,
                }
            })
            setdata(d)
        }
        else if (status === "reportedusers") {
            const colsusers = [
                {
                    title: "Sr#",
                    dataIndex: "serial",
                    key: "serial",
                    render: (text) => {
                        return (
                            <Tooltip placement="topLeft" title={text}>
                                <div className="serial">{text || "1"}</div>
                            </Tooltip>
                        );
                    },
                    width: 50,
                },
                {
                    title: "Reported By",
                    dataIndex: "name",
                    key: "name",
                    render: ({ name, img }) => {
                        return (
                            <Row align={"middle"} gutter={[15, 5]} className="nameavatar">
                                <Col span={5}>
                                    <Avatar src={KEYS.api + img} />
                                </Col>
                                <Col span={17}>
                                    <Typography>
                                        <Typography.Title
                                            className="name"
                                            level={5}
                                            ellipsis={{ rows: 1 }}
                                        >
                                            {name}
                                        </Typography.Title>
                                    </Typography>
                                </Col>
                            </Row>
                        );
                    },
                    width: 150,
                },
                {
                    title: "Reported User",
                    dataIndex: "rname",
                    key: "name",
                    render: ({ name, img }) => {
                        return (
                            <Row align={"middle"} gutter={[15, 5]} className="nameavatar">
                                <Col span={5}>
                                    <Avatar src={KEYS.api + img} />
                                </Col>
                                <Col span={17}>
                                    <Typography>
                                        <Typography.Title
                                            className="name"
                                            level={5}
                                            ellipsis={{ rows: 1 }}
                                        >
                                            {name}
                                        </Typography.Title>
                                    </Typography>
                                </Col>
                            </Row>
                        );
                    },
                    width: 150,
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    render: (date) => <div className="date">{date}</div>,
                    key: "date",
                    width: 150,
                },
                {
                    title: "Message",
                    dataIndex: "message",
                    key: "message",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 200,

                    render: (id) => (
                        <Tooltip placement="topLeft" title={id}>
                            <div className="amount" > {id}</div>
                        </Tooltip>
                    ),
                },
                {
                    title: ("Actions"),
                    dataIndex: "result",
                    key: "result",
                    ellipsis: {
                        showTitle: false,
                    },
                    width: 200,
                    render: (result) => {
                        return (
                            <Row
                                className="result amount"
                                justify={"space-between"}
                                align={"middle"}
                            >
                                <Col span={12} className="transparent red">
                                    <TransparentBtnsAction className="green" onClick={() => { Admin_completereported(result?._id) }} text={"complete"} />
                                </Col>
                                <Col span={12} className="transparent red">
                                    <TransparentBtnsAction onClick={() => setactive(e => e == false ? result?.message : false)} className="green" text={"view"} />
                                </Col>
                            </Row>
                        );
                    },
                },
            ];
            setcolumns(colsusers)
            const d = tabledata?.map((e, i) => {
                return {
                    serial: i + 1,
                    key: i + 1,
                    name: { name: e?.by?.name, img: e?.by?.profile },
                    rname: { name: e?.reported?.name, img: e?.reported?.profile },
                    date: new Date(e?.createdAt).toDateString(),
                    message: e?.message,
                    result: e,
                }
            })
            setdata(d)
        }
        return () => {
            setdata([])
            setcolumns([])
            setactive(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, tabledata])
    const dispatch = useDispatch()
    const fire = useSwal()
    const setcomplete = async (id) => {
        const d = await POSTREQUEST(endpoints.Admin_completenotice, { id })
        console.log(d);
        if (d?.type === "success") {
            dispatch(setData(d.result))
        }
        else if (d?.result) {
            fire("error", d?.result,)
        }
        else {
            fire("error", "An Error Occurred")
        }
    }
    const Admin_completereported = async (id) => {
        const d = await POSTREQUEST(endpoints.Admin_completereported, { id })
        if (d?.type === "success") {
            dispatch(setData(d.result))
        }
        else if (d?.result) {
            fire("error", d?.result,)
        }
        else {
            fire("error", "An Error Occurred")
        }
    }
    const deletepost = async (id) => {
        const d = await POSTREQUEST(endpoints.Admin_deletepost, { id })
        if (d?.type === "success") {
            dispatch(setData(d.data))
        }
        else if (d?.result) {
            fire("error", d?.result,)
        }
        else {
            fire("error", "An Error Occurred")
        }
    }
    const deleteuser = async (id) => {
        const d = await POSTREQUEST(endpoints.Admin_deleteuser, { id })
        if (d?.type === "success") {
            dispatch(setData(d.data))
        }
        else if (d?.result) {
            fire("error", d?.result,)
        }
        else {
            fire("error", "An Error Occurred")
        }
    }
    return {
        columns,
        data,
        active,
        setactive
    }

}

export default useColumns