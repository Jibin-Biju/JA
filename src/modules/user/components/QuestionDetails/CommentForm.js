import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import Editor from '../../../../common/Editor'


function CommentForm({
    setvalues,
    loading,
    onFinish,
    id,
    reply,
    values,
    seteditoropen,
    setreplyeditoropen
}) {
    return (
        <Box w={"100%"} my="50px">
            <Editor
                setvalues={setvalues}
                values={values}
            />
            <Button
                onClick={() => {
                    if (reply)
                        onFinish(values, id, "reply")
                    else
                        onFinish(values, id)

                }}
                isLoading={loading}
                display={"inline-block"}
                ml={"auto"}>
                Post Response
            </Button>
            <Button

                onClick={() => {
                    if (setreplyeditoropen) {
                        setreplyeditoropen(false)
                    }
                    else {
                        seteditoropen(false)
                    }
                }}
                isLoading={loading}
                display={"inline-block"}
                ml={"20px"}>
                Close Editor
            </Button>
        </Box>
    )
}

export default CommentForm