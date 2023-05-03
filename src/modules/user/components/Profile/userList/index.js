/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListItem, Button, Box, Image } from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setProfile } from "../../../../../Store/Features/ProfileSlice";
import { POSTFORMDATA, POSTREQUEST } from "../../../../../config/requests";
import { endpoints } from "../../../../../config/endpoints";
import { KEYS } from "../../../../../config/keys";
import useSwal from "../../../../../common/Errors/SwalCall";

const App = ({ friends, pending, request }) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile)
    const list = friends ? profile?.friends : pending ? profile?.pendingReq : profile?.addfriendReq
    const navigate = useNavigate()
    const fire = useSwal()
    const accept = async (acceptid) => {
        try {
            if (!acceptid) throw new Error("no id")

            const data = await POSTREQUEST(endpoints.acceptfriend, {
                id: profile?._id,
                acceptid
            })
            fire("success", data?.result)
            console.log(data);
            if (data?.type === "failure") {
                return fire("error", data?.result)
            }
            else if (data?.type === "success") {
                console.log(data);
                dispatch(setProfile(data?.data))
                fire("success", data?.result)
            }
        }
        catch (e) {
            console.log(e);
            fire("error", e.message)
        }
    }
    const remove = async (removeId) => {
        try {
            if (!removeId)
                throw new Error("no id")
            const data = await POSTREQUEST(endpoints.removefriend, {
                id: profile?._id,
                removeId
            })
            if (data?.type === "failure") {
                console.log(data);
                return fire("error", data?.result)
            }
            else if (data?.type === "success") {
                console.log(data);
                dispatch(setProfile(data?.data))
                fire("success", data?.result)
            }
        }
        catch (e) {
            console.log(e);
            fire("error", e.message)
        }
    }
    return (
        <Box>
            {
                list?.map((e, i) => <List key={i} spacing={3} w="100%">
                    <ListItem className="userItem" >
                        <Image
                            className="Avatart  profile"
                            src={KEYS.api + e?.profile}
                            h="70px"
                            w={"50px"}
                            borderRadius="xl"
                            objectFit={"cover"}
                        />
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/user/${e._id}`)}>
                            {e.name}
                        </span>
                        {
                            (request && !friends && !pending) &&
                            <Box
                                marginTop={'5px'}
                                marginLeft="auto"
                                display={"flex"}
                                gap={".5rem"}>
                                <Button
                                    onClick={() => accept(e?._id)}
                                    color={"white"}
                                    background={"var(--primary)"}>
                                    accept
                                </Button>
                                <Button
                                    onClick={() => remove(e?._id)}
                                    color={"white"}
                                    background={"var(--red)"}>
                                    reject
                                </Button>
                            </Box>
                        }
                        {
                            (pending && !friends && !request) &&
                            <Box
                                marginTop={'5px'}
                                marginLeft="auto"
                                display={"flex"}
                                gap={".5rem"}>
                                <Button
                                    color={"white"}
                                    background={"var(--primary)"}>
                                    Pending Request
                                </Button>
                            </Box>
                        }
                        {
                            (!pending && !request && friends) &&
                            <Box
                                marginTop={'5px'}
                                marginLeft="auto"
                                display={"flex"}
                                gap={".5rem"}>
                                <Button
                                    onClick={() => remove(e?._id)}
                                    color={"white"}
                                    background={"var(--primary)"}>
                                    Remove Friend
                                </Button>
                            </Box>
                        }
                    </ListItem>
                </List>
                )
            }
            {
                list?.length === 0 &&
                <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                    gap="1rem"
                    minH={"200px"}>
                    <img
                        style={{ margin: "0 auto" }}
                        src={"/images/undraw.svg"} alt="img" width='150px' height='150px'></img>
                </Box>
            }
        </Box>

    );
};

export default App;