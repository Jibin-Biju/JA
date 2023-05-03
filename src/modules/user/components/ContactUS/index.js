import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Textarea,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { POSTREQUEST } from '../../../../config/requests';
import { endpoints } from '../../../../config/endpoints';
import useSwal from '../../../../common/Errors/SwalCall';


export default function ContactUs() {
    const [obj, setobj] = useState({
        email: "",
        username: "",
        message: ""
    })
    const fire = useSwal()
    const onFinish = async () => {
        if (obj.username.length < 3) {
            return fire("error", "Minimum 3 characters (name) required")
        }
        else if (obj.email.length < 10) {
            return fire("error", "Minimum 10 characters (email) required")
        }
        else if (obj.email.message < 30) {
            return fire("error", "Minimum 30 characters (message) required")
        }
        const data = await POSTREQUEST(endpoints.Admin_postreports, obj);
        if (data.type === "success") {
            fire("success", "request submitted")
            setobj({
                email: "",
                username: "",
                message: ""
            })
        } else {
            fire("error", "could not submit request")
        }
    };
    const handlechnage = (e, type) => {
        const value = e?.target?.value
        if (type === "email") {
            setobj(val => {
                return {
                    ...val,
                    email: value
                }
            })
        }
        if (type === "username") {
            setobj(val => {
                return {
                    ...val,
                    username: value
                }
            })
        }
        if (type === "message") {
            setobj(val => {
                return {
                    ...val,
                    message: value
                }
            })
        }
    }
    return (
        <React.Fragment>
            <Flex
                align="center"
                justify="center"
                id="contact">
                <Box
                    borderRadius="lg"
                    m={{ base: 20, md: 20, lg: 8 }}
                    p={{ base: 5, lg: 16 }}>
                    <Box>
                        <VStack spacing={{ base: 5, md: 8, lg: 8 }}>
                            <Heading
                                color={'var(--primary)'}
                                fontSize={{ base: '3xl', md: '4xl', }}>Get in Touch
                            </Heading>
                            <Stack
                                direction={{ base: 'column', md: 'row' }}>
                                <Box
                                    bg={useColorModeValue('white', 'gray.700')}
                                    borderRadius="lg"
                                    p={8}
                                    minW={{ lg: "700px", md: "600px", sm: "95vw", base: "90vw" }}
                                    color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                                    shadow="base">
                                    <VStack spacing={5}>
                                        <FormControl isRequired>
                                            <FormLabel>Name</FormLabel>

                                            <InputGroup>
                                                <InputLeftElement children={<BsPerson />} />
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    value={obj.username}
                                                    onChange={e => handlechnage(e, "username")}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Email</FormLabel>

                                            <InputGroup>
                                                <InputLeftElement children={<MdOutlineEmail />} />
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    value={obj.email}
                                                    onChange={e => handlechnage(e, "email")}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Message</FormLabel>

                                            <Textarea
                                                name="message"
                                                placeholder="Your Message"
                                                rows={6}
                                                value={obj.message}
                                                onChange={e => handlechnage(e, "message")}
                                                resize="none"
                                            />
                                        </FormControl>
                                        <Button
                                            colorScheme="blue"
                                            bg="var(--primary)"
                                            color="white"
                                            _hover={{
                                                bg: "black",
                                            }}
                                            onClick={onFinish}
                                        >
                                            Send Message
                                        </Button>
                                    </VStack>
                                </Box>
                            </Stack>
                        </VStack>
                    </Box>
                </Box>
            </Flex>
        </React.Fragment>
    );
}


