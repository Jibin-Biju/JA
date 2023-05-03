
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { endpoints } from "../../../../../../config/endpoints"
import { POSTREQUEST } from "../../../../../../config/requests"
import ListedQuestion from "../../../../../../common/listedQuestion"

function Index({ query }) {
    const { id } = useParams()
    const [list, setlist] = useState([])
    const get = async () => {
        var url = query === "question" ? endpoints.othertopics : endpoints.otheranswers
        const data = await POSTREQUEST(url, { id })
        setlist(data?.result || [])
    }
    useEffect(() => {
        get()
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    return (
        <Box>
            {list?.length > 0 ?
                list?.map((e, i) => {
                    return (
                        <Box mb="15px" key={i}>
                            <ListedQuestion data={e} key={i} />
                        </Box>
                    )
                })
                :
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
        </Box >
    )
}

export default Index