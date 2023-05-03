import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Input,

} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import Editor from '../../../../common/Editor'
import { TagsInput } from "react-tag-input-component"
import { useDispatch } from 'react-redux'
import { setPostdata } from '../../../../Store/Features/posts'
import { POSTREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
import useSwal from '../../../../common/Errors/SwalCall'


const EditModal = ({
    editquestion,
    open,
    data,
    status,
    setOpen
}) =>
    editquestion ?
        <EditQuestion
            open={open}
            data={data}
            setOpen={setOpen}
        />
        : <EditCommentReply
            open={open}
            data={data}
            status={status}
            setOpen={setOpen}
        />



// edit question component
const EditQuestion = ({
    open,
    data,
    setOpen
}) => {

    const [loading, setloading] = useState(false)

    const [Body, setBody] = useState(data?.Body)
    const [Title, setTitle] = useState(data?.Title)
    const [Tags, setTags] = useState(data?.Tags)
    const fire = useSwal()
    const dispatch = useDispatch()
    useEffect(() => {
        setTitle(data?.Title)
        setBody(data?.Body)
        setTags(data?.Tags)
    }, [data])

    const Editpost = async () => {
        try {
            if (String(Title)?.trim().length < 30) {
                return fire("", "Add Title properly, minimum 30 characters required")
            }

            if (String(Body)?.trim().length < 100) {
                return fire("", "Add Description properly, minimum 100 characters required")
            }
            if (Tags?.length < 1 || !Tags) {
                return fire("", "Add Tags properly, 1 tag required")
            }
            setloading(true)
            const d = await POSTREQUEST(endpoints.editpost, {
                id: data?._id,
                Title: Title,
                Body: Body,
                Tags: Tags
            })

            if (d.type === 'success') {
                dispatch(setPostdata(d.data))
                setOpen(false)
            }
            setloading(false)
        }
        catch (e) {
            console.log(e.message);
            setloading(false)

        }
    }

    useEffect(() => {
        return () => {
            setloading(null)
            setBody(null)
            setTags(null)
            setTitle(null)
            setloading(null)
        }
    }, [])
    return (
        <Modal
            size={"6xl"}
            isCentered
            isOpen={open}
            onClose={() => setOpen(false)}>
            < ModalOverlay
                bg='none'
                backdropFilter='auto'
                h={"100vh"}
                backdropInvert='20%'
                backdropBlur='3px'
                zIndex={"1"}

            />
            <ModalContent
                shadow={"lg"}
                w={"90%"}
                h="80vh"
                overflowY={"scroll"}
                border="2px solid var(--lightGrey)"
            >
                <ModalBody>
                    <Box>
                        <Heading
                            fontWeight={600}
                            textAlign="center"
                            color="var(--red)"
                            mb={"10px"}>
                            Ask a Question
                        </Heading>
                        <div className="input_title">
                            <Text
                                color="var(--red)"
                                as={'h3'}
                                fontSize="1.4rem"
                                fontWeight={"500"}
                            >Edit Title
                            </Text>
                            <Text my={"5px"}>Be specidfied and imagine you are asking question from another person</Text>
                            <Input
                                value={Title}
                                onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="e.g how to add hover effect in css3?" />
                        </div>
                        <div className="Editor_container">
                            <Text
                                mt={"20px"}
                                color="var(--red)"
                                as={'h3'}
                                fontSize="1.4rem"
                                fontWeight={"500"}>Body</Text>
                            <p>Include all the information someone might need to answer your question</p>
                            <Editor defaultvalue={Body} setvalues={setBody} />
                        </div>
                        <div className="QuestionPage_tag Editor_container">
                            <Text
                                color="var(--red)"
                                as={'h3'}
                                fontSize="1.4rem"
                                fontWeight={"500"}>Tags</Text>
                            <p>Add upto 5 tags to show what is your question is about</p>
                            <div className='setinput'>
                                <TagsInput
                                    separators={' '}
                                    value={Tags || undefined} onChange={e => setTags(e)}
                                    name='tags'
                                    placeholder="enter tag and press space key" />
                            </div>

                        </div>
                        <Button
                            background={"var(--primary)"}
                            m="20px auto 10px auto"
                            color={"white"}
                            _hover={{
                                background: "var(--primary)"
                            }}
                            _loading={loading}
                            isLoading={loading}
                            className="btn"
                            onClick={Editpost}>
                            Submit
                        </Button>
                    </Box>
                </ModalBody>

            </ModalContent>
        </Modal >
    )
}

// edit reply component
const EditCommentReply = ({
    open,
    data,
    status,
    setOpen
}) => {

    const [value, setvalue] = useState("")
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const update = async () => {
        try {
            setloading(true)
            let d
            if (status === "Reply") {
                d = await POSTREQUEST(endpoints.editreply, {
                    body: value,
                    id: data?._id
                })
            }
            else if (status === "Comment") {
                d = await POSTREQUEST(endpoints.editcomment, {
                    body: value,
                    id: data?._id
                })
            }
            if (d?.type === "success") {
                dispatch(setPostdata(d.data))
            }
            setloading(false)
            console.log(d);
            setOpen(false)
        }
        catch (e) {
            setloading(false)
            console.log(e);
        }
    }
    useEffect(() => {
        return () => {
            setvalue(null)
            setloading(null)
        }

    }, [])
    return (
        <Modal
            size="6xl"
            isCentered
            // closeOnEsc
            // closeOnOverlayClick
            isOpen={open}
            onClose={() => setOpen(false)}>
            < ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            // bg='blackAlpha.300'
            // backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalHeader>
                    Edit {` ${status}`}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Editor defaultvalue={data?.Body} setvalues={setvalue} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        _loading={loading}
                        isLoading={loading}
                        colorScheme='blue'
                        mr={3} onClick={() => { update() }}>
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}



export default EditModal

