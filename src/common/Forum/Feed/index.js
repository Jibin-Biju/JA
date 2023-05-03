/* eslint-disable jsx-a11y/anchor-is-valid */
import MetaQuestion from "../../listedQuestion"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"


function Feed() {
    const posts = useSelector(state => state.post.posts)
    const { pathname } = useLocation()
    const condition = pathname.includes("search")
    return (
        <Box className={'Feed'} flex={1}>
            {
                condition ? null :
                    <Box className={`QuestionField`} shadow="md" >Add a New Thread
                        <Link to={`/addquestion`}  >
                            <AiOutlinePlusCircle style={{ display: "grid", placeContent: 'center', color: 'white' }} className={`svg shadow3`} />
                        </Link>
                    </Box>
            }

            <div className={'List'}>
                {
                    posts?.map((e, i) =>
                        <MetaQuestion key={i} className="shadow1" data={e} />
                    )
                }
            </div>
        </Box >
    )
}
export default Feed