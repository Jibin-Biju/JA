import React, { Fragment, useRef } from 'react'
import { Avatar, Box, Heading, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import moment from 'moment';
import { ArrowDownIcon, ArrowUpIcon, ChatIcon } from "@chakra-ui/icons"
import { useNavigate } from 'react-router-dom';
import { KEYS } from '../../config/keys';
function Index({ data, admin }) {
    const text = useRef()
    const navigate = useNavigate()
    function extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };
    text.current = extractContent(data?.Body)
    let commentcount = 0;
    data?.Comments?.forEach(e => {
        commentcount++;
        e?.reply?.map(e => commentcount++)
    })
    return (
        <Fragment>
            <Box
                shadow={"md"}
                background="white"
                px={"4"}
                wordBreak="break-word"
                py="5"
                rounded="lg"
                className='metaquestion'>
                <Stack
                    direction={["column-reverse", "row"]}
                    align={"center"}
                    spacing='7'>
                    <Stack
                        textAlign={"center"}
                        direction={["row", "column"]}>
                        <Icon
                            color={"blue.500"}
                            as={ArrowUpIcon} w={8} h={6} />
                        <Text >
                            {data?.Likes?.count || 0}
                        </Text>
                        <Icon as={ArrowDownIcon} w={8} h={6}
                            color={"red.500"} />
                    </Stack>
                    <VStack
                        lineHeight={"30px"}
                        w="100%"
                        spacing={"5"}>
                        <Heading
                            cursor={"pointer"}
                            onClick={() => {
                                if (!admin)
                                    navigate(`/question/${data?._id}`)
                                else navigate(`/dashboard/question`, { state: data })
                            }}
                            _hover={{ color: "var(--red)" }}
                            textAlign={"left"}
                            w="100%"
                            fontFamily={"Poppins"}
                            color="blackAlpha.800"
                            fontWeight={"600"}
                            size={"md"}>
                            {data?.Title}
                        </Heading>
                        <Text
                            textAlign={"left"}
                            w="100%"

                            color={"blackAlpha.700"}
                            noOfLines={3}>
                            {text.current}
                        </Text>
                        <Box
                            gap={"20px"}
                            pt="3"
                            w={"100%"}
                            borderTop={"2px solid lightgrey"}>
                            <Stack
                                wrap={"wrap"}
                                direction={["row", "row", "row", "row"]}
                                spacing={"2"}>

                                {
                                    data?.Author &&
                                    <Avatar
                                        size={"sm"}
                                        src={KEYS.api + data?.Author?.profile}
                                        bg='teal.500'
                                        mr={"20px !important"} />
                                }
                                {
                                    data?.Author &&
                                    <Text
                                        color={"darkgray"}
                                        fontWeight={"600"}
                                        fontSize={"sm"}>
                                        {" Posted by "}

                                    </Text>
                                }
                                {
                                    data?.Author &&
                                    <Text
                                        cursor={"pointer"}
                                        onClick={() => {
                                            if (!admin)
                                                navigate(`/user/${data?.Author?._id}`)
                                            else
                                                navigate(`/dashboard/user-profile/`, {
                                                    state: data.Author
                                                })
                                        }}
                                        color={"blue.400"}
                                        fontWeight={"700"}
                                        fontSize={"sm"}>
                                        {data?.Author?.name}
                                    </Text>
                                }

                                <Text
                                    textAlign="right"
                                    color={"darkgray"}
                                    fontWeight={"600"}
                                    fontSize={"sm"}>
                                    {moment(new Date()).fromNow()}
                                </Text>
                                <Box
                                    display={"flex"}
                                    alignItems="center"
                                    gap={".5rem"}
                                    justifyContent="flex-end"
                                    flex={"1"}>
                                    <ChatIcon
                                        color={"darkgray"}
                                        fontSize={"sm"} />
                                    <Text
                                        color={"darkgray"}
                                        fontSize={"14px"} >
                                        {commentcount}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                    </VStack>
                </Stack>
            </Box>
        </Fragment>
    )
}

export default Index