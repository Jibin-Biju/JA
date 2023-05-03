
import React, { Fragment, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Image, List, ListItem, Stack, Text } from '@chakra-ui/react';
import FORUM from '../../../../common/Forum';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useSwal from '../../../../common/Errors/SwalCall';
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice';
import { GETREQUEST } from '../../../../config/requests';
import { endpoints } from '../../../../config/endpoints';
import { KEYS } from '../../../../config/keys';


function Search() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const [data, setdata] = useState({})
    const { query } = useParams()
    const fire = useSwal()
    const get = async () => {
        try {
            dispatch(showLoader())
            const data = await GETREQUEST(endpoints.search + query + "&tags=" + state || false,)
            if (data.type === "failure") {
                fire("error", data?.result)
            }
            setdata(data?.result || {})
            dispatch(hideLoader())
        }
        catch (e) {
            console.log(e.message);
            dispatch(hideLoader())
        }
    }
    useEffect(() => {
        get()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, query])
    // const empty = data?.users?.length === 0 && data?.posts?.leng th === 0
    const empty = data?.users?.length === 0 && data?.posts?.length === 0
    return (
        <Fragment>

            {
                empty ?
                    <Box textAlign="center" mt={"50px"} minH={'40vh'} px={6}>
                        <Heading
                            display="inline-block"
                            as="h2"
                            size="2xl"
                            bg={'var(--primary)'}
                            backgroundClip="text">
                            403
                        </Heading>
                        <Text fontSize="18px" mb={2}>
                            Results Not Found
                        </Text>
                        <Text color={'gray.500'} >
                            The Results you're looking for does not seem to exist
                        </Text>
                    </Box>
                    :
                    <Box minH={'50vh'} py="10px" w={"100%"}>
                        {
                            data?.posts?.length > 0 ? < FORUM
                                posts={data?.posts}
                                onlyFeed
                            />
                                : null
                        }
                        {
                            <List
                                margin={"auto"}
                                spacing={2}
                                mt="15px"
                                w="100%">

                                {
                                    data?.users?.map((e, i) =>
                                        <ListItem
                                            background="var(--lightGrey)"
                                            rounded="10px"
                                            shadow='md'
                                            onClick={() => navigate(`/user/${e._id}`)}
                                            gap="20px"
                                            key={i}
                                            padding={"10px"}
                                            className="userItem" >
                                            <Image
                                                className="Avatart  profile"
                                                src={KEYS.api + e?.profile}
                                                h="70px"
                                                w={"50px"}
                                                borderRadius="xl"
                                                objectFit={"cover"}
                                            />
                                            <Stack>
                                                <span> {e.name} </span>

                                                <Text mt={"15px"} fontWeight={"400"}> {e?.bio} </Text>
                                            </Stack>
                                        </ListItem>
                                    )
                                }

                            </List>

                        }
                    </Box>
            }
        </Fragment>
    )
}
export default Search