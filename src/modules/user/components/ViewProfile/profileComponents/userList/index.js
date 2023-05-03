import { List, ListItem, Box, Image } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { KEYS } from "../../../../../../config/keys";

const App = () => {
    const list = useSelector(state => state.profile.user.friends)
    const navigate = useNavigate()
    return (
        <Box>
            {
                list?.map((e, i) => <List key={i} spacing={3} w="100%">
                    <ListItem className="userItem">
                        <Image
                            className="Avatart  profile"
                            src={KEYS.api + e?.profile}
                            fallback
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