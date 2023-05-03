import { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import ListedQuestion from "../../../../../common/listedQuestion"
import Spinner from "../../../../../common/Loader/content"
import { GETREQUEST } from "../../../../../config/requests"
import { endpoints } from "../../../../../config/endpoints"
import { useDispatch } from "react-redux"
import { hideLoader, showLoader } from "../../../../../Store/Features/LoaderSlice"
function Index({ query }) {
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const get = async () => {
        dispatch(showLoader())
        // get questinos logic
        var data = null, url = null;
        if (query === "question") url = endpoints.mytopics
        if (query === "answer") url = endpoints.myanswers
        if (query === "saved") url = endpoints.saved
        data = await GETREQUEST(url)
        if (data?.type === "success")
            setlist(data?.result)
        dispatch(hideLoader())
    }
    useEffect(() => {
        get()
        return () => {
            setlist(null)
            setloading(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Box>
            <Spinner />
            {
                list?.length > 0 ?
                    list?.map((e, i) => {
                        return (
                            <Box mb={"15px"} key={i}>
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