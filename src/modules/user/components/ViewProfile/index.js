import {
  Box,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Editor from "../../../../common/Editor";
import { KEYS } from "../../../../config/keys";
import UserList from "./profileComponents/userList"
import { useDispatch, useSelector } from "react-redux"
import { endpoints } from "../../../../config/endpoints";
import useSwal from "../../../../common/Errors/SwalCall";
import { useNavigate, useParams } from "react-router-dom";
import QuestionList from "./profileComponents/QuestionList"
import { setUser } from "../../../../Store/Features/ProfileSlice";
import { POSTREQUEST, PUTREQUEST } from "../../../../config/requests";
import { showLoader, hideLoader } from "../../../../Store/Features/LoaderSlice";


function OtherUserProfile() {
  const user = useSelector(state => state.profile.user)
  const profile = useSelector(state => state.profile.profile)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setinput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fire = useSwal()
  const AddFriend = async () => {
    const usertofollowid = id
    const pid = profile?._id
    if (pid) {
      const data = await PUTREQUEST(endpoints.follow, { id: pid, usertofollowid })
      if (data.type === "success") {
        dispatch(setUser({ ...data.data, button: "Cancel" }))
        fire("success", "Request Sent")
      }
      else {
        fire("error", data?.result)
        dispatch(setUser({ ...user, button: "Cancel" }))
      }
    }
    else {
      fire("error", "Your id not found")
    }
  }
  const CancelRequest = async () => {
    const usertounfollowid = id
    const pid = profile?._id
    const data = await PUTREQUEST(endpoints.unfollow, { id: pid, usertounfollowid })
    if (pid) {
      if (data.type === "success") {
        fire("success", "Request Canceled")
        dispatch(setUser({ ...data.data, button: "Add" }))
      }
      else {
        fire("error", data?.result)
        if (data?.result === "You haven't send request to this account") {
          dispatch(setUser({ ...user, button: "Remove" }))
        }
        else {
          dispatch(setUser({ ...user, button: "Add" }))
        }
      }
    }

  }
  const Removefriend = async () => {
    const removeId = user?._id
    let id = profile?._id
    if (id) {
      const data = await POSTREQUEST(endpoints.unfriend, { id, removeId })
      if (data.type === "success") {
        dispatch(setUser({ ...data.result, button: "Add" }))
        fire("success", "Friend Removed")
      }
    }
  }
  const get = async () => {
    try {
      dispatch(showLoader())
      const data = await POSTREQUEST(endpoints.getSingleUser, { id })
      if (data?.type === 'success') {
        dispatch(setUser({ ...data.result, button: data.button }))
      }
      console.log(data);
      dispatch(hideLoader())
    }
    catch (e) {
      dispatch(hideLoader())
    }
  }
  const onClose = () => setIsOpen(false);

  const onSave = async () => {
    if (input.length < 50) {
      onClose();
      return fire("info", "atleast 50 characters are required")
    }
    const data = await POSTREQUEST(endpoints.reportuser, { id, message: input })
    if (data.type === "success") {
      onClose();
      return fire("success", data.result)
    }
    else fire("error", data?.result || "couldn't report user!")
    onClose();
  };

  useEffect(() => {
    if (id === profile?._id)
      return navigate("/profile")
    else if (id) get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])




  return (
    <div className={'profilecontainer'}>
      <VStack
        textAlign={"center"}
        spacing={"6"}
        w={"100%"}>
        <Box>
          <Image
            boxSize={"sm"}
            borderRadius="full"
            objectFit={"cover"}
            h={"200px"}
            w="200px"
            shadow={"xl"}
            className="profile"
            src={KEYS.api + user?.profile}
            fallbackSrc='https://via.placeholder.com/150'
            alt="profile"
          />
        </Box>

        <VStack
          userSelect={"none"}
          spacing={1}>
          <Heading as={"h4"} >{user ? user?.name : "name"}</Heading>
          <Text fontSize={19}>
            {user ? user.email : "email"}
          </Text>
          <Text fontSize={19}>
            {user?.friends?.length === 0 && " 0 Connections"}
            {user?.friends?.length === 1 && " 1 Connection"}
            {user?.friends?.length > 1 && user?.friends?.length + "  Connections"}
          </Text>

        </VStack>
        <Box>
          {
            user?.button === "Add" &&
            <button
              className="btn"
              style={{ padding: "4px 18px" }}
              onClick={AddFriend}>
              Add Friend
            </button>
          }
          {
            user?.button === "Cancel" &&
            <button
              className="btn"
              style={{ padding: "4px 18px" }}
              onClick={CancelRequest}>
              Cancel Request
            </button>
          }
          {
            user?.button === "Remove" &&
            <button
              className="btn"
              style={{ padding: "4px 18px" }}
              onClick={Removefriend}>
              Remove Friend
            </button>
          }
          {
            <button
              className="btn"
              style={{ padding: "4px 18px", marginLeft: "10px" }}
              onClick={() => setIsOpen(e => !e)}
            >
              Report User
            </button>
          }
        </Box>
      </VStack>
      <div className={`containTwo`}>
        <Box>
          <Box
            shadow={'sm'}
            className={'BioDiv'}>
            <p
              style={{ color: "black", margin: "0" }}>
              {user?.bio}
            </p>
          </Box>
        </Box>
        <Tabs
          isManual
          isLazy
          defaultChecked={1}
          variant="soft-rounded"
          overflowX="scroll"
          colorScheme='linkedin'>
          <TabList
            borderRadius={"6px"}
            shadow={"sm"}
            padding={"10px"}
            background="white">
            <Tab>Questions</Tab>
            <Tab>Answers</Tab>
            <Tab>Friends</Tab>
          </TabList>
          <TabPanels
            background={'#ECF0F1'}
            shadow="md"
            borderRadius={"lg"}
            mt={"20px"}>
            <TabPanel>
              <QuestionList query={"question"} />
            </TabPanel>
            <TabPanel>
              <QuestionList query={"answer"} />
            </TabPanel>
            <TabPanel>
              <UserList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      {
        isOpen ?
          <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Report User</ModalHeader>
              <ModalBody>
                <Editor values={input} setvalues={setinput} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" ml={3} onClick={onSave}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          : null
      }
    </div >
  );
}

export default OtherUserProfile;


