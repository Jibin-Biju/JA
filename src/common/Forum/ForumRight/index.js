

import { Heading, StackDivider, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoints } from "../../../config/endpoints"
import { GETREQUEST } from "../../../config/requests"

const RightBar = ({ active, w }) => {
    return (
        <VStack
            w={w ? "100% !important" : undefined}
            pos={w ? 'relative' : "fixed"}
            spacing={2}>
            <RecentQuestions />
        </VStack>
    )
}

const RecentQuestions = () => {
    const [recents, setrecents] = useState([])
    const navigate = useNavigate()
    const get = async () => {
        const data = await GETREQUEST(endpoints.recent)
        setrecents(data?.result || [])
    }
    useEffect(() => {
        get()
        return () => {
            setrecents(null)
        }
    }, [])
    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            w={"100%"}
            p="1.5rem 1.2rem"
            borderRadius="lg"
            shadow={"md"}
            background={"white"}
            spacing={2}
        >
            <Heading
                mb={"3"}
                textAlign={"center"}
                size={"md"}>
                Recent Questions
            </Heading>

            {
                recents?.map((e, i) => {
                    return <Text
                        onClick={() => navigate("/question/" + e?._id)}
                        key={i}
                        isTruncated
                        cursor={"pointer"}
                        color={"blue.500"}
                        fontSize={"14px"}
                        w="100%"
                        textAlign={"left"}>
                        {e?.Title}
                    </Text>
                })
            }
        </VStack>
    )
}
export default RightBar
