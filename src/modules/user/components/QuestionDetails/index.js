import { Avatar, Box, Button, Heading, HStack, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams, } from 'react-router-dom'
import {
    AiOutlineArrowDown,
    AiOutlinePushpin,
} from "react-icons/ai"


import moment from 'moment';
import COMMENTS from "./Comments"
import CommentForm from "./CommentForm"



import { ArrowDownIcon, HamburgerIcon } from "@chakra-ui/icons"
import EditModal from "./EditModal"
import { useDispatch, useSelector } from "react-redux";
import { setPostdata } from "../../../../Store/Features/posts";
import { POSTREQUEST } from "../../../../config/requests";
import { endpoints } from "../../../../config/endpoints";
import { hideLoader, showLoader } from "../../../../Store/Features/LoaderSlice";
import { KEYS } from "../../../../config/keys";
import useSwal from "../../../../common/Errors/SwalCall";
import { useCheckAuthor } from "../../../../common/hooks/useCheckAuthor";
import Swal from "sweetalert2";

function QuestionWrapper() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.post.postdata)
    const profile = useSelector(state => state.profile.profile)

    const [Body, setBody] = useState('')
    const { id } = useParams()
    const [isCommentOpen, setisCommentOpen] = useState(data?._id)
    const [editoropen, seteditoropen] = useState(false)
    const [editQuestion, seteditQuestion] = useState(false)
    const [loading, setloading] = useState(false)
    const { isAuthor, isLikedAuthor, isTextAuthor, isUnlikedAuthor } = useCheckAuthor(data)
    const fire = useSwal()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) getpostdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getpostdata = async () => {
        try {
            dispatch(showLoader())
            const res = await POSTREQUEST(endpoints.singlepost, { id },)
            if (res.type === "success") {
                dispatch(setPostdata(res.result))
            }
            dispatch(hideLoader())
        }
        catch (e) {
            getpostdata()
        }
    }
    const postcomment = async (e, id, reply) => {
        try {
            if (!e) {
                throw new Error("Add something in Editor before posting!")
            }
            var dd = null
            setloading(true)
            if (data?.Comments && !reply) {
                dd = await POSTREQUEST(endpoints.comment, { id, body: e })
                if (dd?.type === 'success') {
                    dispatch(setPostdata(dd?.data))
                }
                else {
                    fire("error", dd.result)
                }
            }
            else {
                dd = await POSTREQUEST(endpoints.reply, { id, body: e })
                if (dd?.type === 'success') {
                    dispatch(setPostdata(dd?.data))
                }
                else {
                    fire("error", dd.result)
                }

            }
            setloading(false)
            seteditoropen(false)
        }
        catch (e) {
            console.log(e);
            fire("error", e?.message || e)
            setBody("")
            setloading(false)
            seteditoropen(false)
        }
    }
    const like = async (status) => {
        try {
            if (loading) return
            setloading(true)
            var d = null
            if (status === "like") {
                d = await POSTREQUEST(endpoints.like, { id, type: "like" })
                if (d?.type === 'success')
                    dispatch(setPostdata(d.data))
                else {
                    fire("error", d.result)
                }
            }
            else if (status === "unlike") {
                d = await POSTREQUEST(endpoints.like, { id, type: "unlike" })
                if (d?.type === 'success')
                    dispatch(setPostdata(d.data))
                else {
                    fire("error", d.result)
                }
            }
            setloading(false)
        }
        catch (e) {
            setloading(false)
            console.log(e);
        }
    }
    const unlike = async (status) => {
        try {
            if (loading) return
            setloading(true)
            var d = null
            if (status === "like") {
                d = await POSTREQUEST(endpoints.unlike, { id, type: "like" })
                if (d?.type === 'success')
                    dispatch(setPostdata(d.data))
                else {
                    fire("error", d.result)
                }
            }
            else if (status === "unlike") {
                d = await POSTREQUEST(endpoints.unlike, { id, type: "unlike" })
                if (d?.type === 'success')
                    dispatch(setPostdata(d.data))
                else {
                    fire("error", d.result)
                }
            }
            setloading(false)
        }
        catch (e) {
            setloading(false)
            console.log(e);
        }
    }

    const savequestion = async () => {
        try {
            setloading(true)
            const d = await POSTREQUEST(endpoints.addtosave, { id })
            if (d?.type === 'success') {
                dispatch(setPostdata(d?.data))
            }
            setloading(false)
        }
        catch (e) {
            console.log(e);
            setloading(false)
        }
    }

    const removesavequestion = async () => {
        try {
            if (loading) return
            setloading(true)
            const d = await POSTREQUEST(endpoints.removefromsave, { id })
            if (d?.type === 'success') {
                dispatch(setPostdata(d?.data))
            }
            setloading(false)
        }
        catch (e) {
            console.log(e);
            setloading(false)
        }
    }
    const deleteit = (e) => {
        try {
            Swal.fire("question", "Are you sure you want to delete this question?")
                .then(async (e) => {
                    if (e.isConfirmed) {
                        let d = await POSTREQUEST(endpoints.deletepost, { id: data?._id })
                        if (d?.type === "success")
                            navigate("/")
                        else {
                            fire("error", d?.result)
                        }
                    }
                })

        }
        catch (e) {
            console.log(e);
        }
    }
    const handlenavigate = (id) => {
        if (data?.Author?._id === profile?._id) {
            navigate("/profile")
        }
        else navigate(`/user/${id}`)
    }

    useEffect(() => {
        return () => {
            setBody(null)
            seteditoropen(null)
        }
    }, [])

    let commentcount = 0;
    data?.Comments?.forEach(e => {
        commentcount++;
        e?.reply?.map(e => commentcount++)
    })

    return (
        <Stack
            shadow={"md"}
            padding={"25px 30px"}
            rounded={"lg"}
            spacing="10"
            background={"white"}
        >
            <Box>
                <Heading
                    fontFamily={"Poppins"}
                    mb="5"
                    display={"flex"}
                    alignItems="flex-start"
                    wrap="wrap"
                    justifyContent={"space-between"}
                    size={"lg"}>
                    {data?.Title}


                    {
                        isAuthor ?
                            <Menu >
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    ml={"10px"}
                                    icon={<HamburgerIcon />}
                                />
                                <MenuList >
                                    <MenuItem
                                        onClick={() => seteditQuestion(true)}
                                        fontSize={"16px"}>
                                        Edit Post
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => deleteit()}
                                        fontSize={"16px"}>
                                        Delete Post
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            : null
                    }


                    {
                        editQuestion &&
                        <EditModal
                            status={"Post"}
                            editquestion
                            open={editQuestion}
                            setOpen={seteditQuestion}
                            data={data}
                        />
                    }

                </Heading>
                <Text dangerouslySetInnerHTML={{ __html: data?.Body }} />
                {
                    data?.Tags &&
                    <HStack mt={"20px"} gap="2px" wrap={"wrap"}>
                        {
                            data?.Tags?.map((e, i) => {
                                return (
                                    <Box
                                        margin={"0"}
                                        background={"var(--red)"}
                                        color="white"
                                        padding={"5px 15px"}
                                        rounded="15px"
                                        key={i}
                                        fontSize="14px"
                                    >
                                        {e}
                                    </Box>
                                )
                            })
                        }




                    </HStack>
                }
                <Box
                    mt={"20px"}
                    className={'QuestionDetailsRL'}>
                    <div>
                        <Box
                            onClick={
                                data?.saved ?
                                    removesavequestion :
                                    savequestion
                            }
                            className={'icondiv'}
                            background={data?.saved ? "var(--red)" : "ButtonShadow"}
                            color={data?.saved ? "white" : undefined}
                        >
                            <AiOutlinePushpin />
                        </Box>
                        <Box
                            background={"ButtonShadow"}
                            style={{ cursor: "pointer" }}
                            onClick={() => handlenavigate(data?.Author?._id)}
                            className={`icondiv user `}>
                            <Avatar
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    marginRight: "2px"
                                }}
                                src={KEYS.api + data?.Author?.profile}

                            />
                            {data?.Author?.name || " Test name"}

                        </Box>


                    </div>
                    <Box
                        background={"ButtonShadow"}
                        className={`icondiv mleft`}>
                        {moment(data?.createdAt).fromNow()}
                    </Box>
                </Box>

            </Box>

            {/* comments and likes counter */}
            <HStack
                padding={"8px 10px"}
                rounded={"sm"}
                borderTop="2px solid ButtonShadow"
                borderBottom="2px solid ButtonShadow"
                spacing={"10"}
                mt={"30px !important"}
            >
                <HStack>
                    <Image
                        h={"20px"}
                        mt="5px"
                        alt=""
                        src={"/images/icons/like.png"} />
                    <Text style={{ userSelect: "none", marginLeft: "10px" }}>
                        {data?.Likes?.count || 0}
                    </Text>

                </HStack>
                <HStack >
                    <Image
                        h={"20px"}
                        mt="5px"
                        alt=""
                        src={"/images/icons/comment.png"} />
                    <Text style={{ userSelect: "none", marginLeft: "5px" }}>
                        {data?.Likes ? commentcount : '0'}
                    </Text>
                </HStack>
            </HStack>


            {/* comment and like box */}
            <Box
                mb={"10px !important"}
                mt={"20px !important"}>

                <HStack
                    spacing={"5"}
                    justify={"center"}>
                    {
                        !isUnlikedAuthor ?
                            <Fragment>
                                {
                                    !isLikedAuthor ?
                                        <Button
                                            className={'left'}
                                            onClick={e => like("like")}>
                                            Upvote
                                            <AiOutlineArrowDown
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            />
                                        </Button>
                                        :
                                        <Button
                                            background={"blue.600"}
                                            color="white"
                                            className={'left'}
                                            onClick={e => like("unlike")}>
                                            Upvoted
                                            <AiOutlineArrowDown
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            />
                                        </Button>
                                }
                            </Fragment>
                            : null
                    }

                    {
                        !isLikedAuthor ?
                            <Fragment>
                                {
                                    !isUnlikedAuthor ?
                                        <Button
                                            className={'left'}
                                            onClick={e => unlike("like")}>
                                            Downvote
                                            <ArrowDownIcon
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            />
                                        </Button>
                                        :
                                        <Button
                                            background={"var(--red)"}
                                            color="white"
                                            className={'left'}
                                            onClick={e => unlike("unlike")}>
                                            Downvoted
                                            <ArrowDownIcon
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            />
                                        </Button>
                                }
                            </Fragment>
                            : null
                    }
                    <Button
                        className={'left'}
                        color={isCommentOpen === data?._id ? "blue.500" : "black"}
                        onClick={() => setisCommentOpen(a => data?._id === a ? "" : data?._id)}>
                        Toggle  Comments
                    </Button>
                </HStack>

                {/* comments */}
                <Fragment>
                    {/* comment editor */}
                    {
                        (isCommentOpen === data?._id && editoropen) &&
                        <Box
                            ml={"auto !important"}
                            maxW="100%"
                            w={"100%"}>
                            <CommentForm
                                onFinish={postcomment}
                                setvalues={setBody}
                                values={Body}
                                id={id}
                                loading={loading}
                                seteditoropen={seteditoropen}
                            />
                        </Box>
                    }

                    {/* comment Component Called */}
                    {
                        (!editoropen && isCommentOpen) &&
                        <Button
                            mt={"20px"}
                            marginLeft={'1%'}
                            onClick={() => seteditoropen(true)}
                            color='blue.400'>
                            Add response
                        </Button>
                    }

                </Fragment>

                {
                    isCommentOpen &&
                    <COMMENTS
                        onFinish={postcomment}
                        loading={loading}
                        data={data?.Comments}
                        seteditoropen={seteditoropen}
                    />
                }
            </Box>

        </Stack >
    )
}

export default QuestionWrapper

