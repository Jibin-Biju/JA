import React, { useLayoutEffect } from 'react'
import FORUM from '../../../../common/Forum'
import { useDispatch } from 'react-redux'
import { setPosts } from '../../../../Store/Features/posts'
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice'
import { GETREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
function MYQuestion() {
    const dispatch = useDispatch()
    const get = async () => {
        try {
            dispatch(showLoader())
            const data = await GETREQUEST(endpoints.mytopics)
            dispatch(setPosts(data?.result || []))
            dispatch(hideLoader())
        }
        catch (e) {
            console.log(e);
            dispatch(hideLoader())
        }
    }
    useLayoutEffect(() => {
        get()
        return () => {
            dispatch(hideLoader())
        }
    }, [])

    return <FORUM />

}

export default MYQuestion