import React, { useEffect } from 'react'
import FORUM from '../../../../common/Forum'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice'
import { GETREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
import { setPosts } from '../../../../Store/Features/posts'
function MYAnswers() {
    const dispatch = useDispatch()
    const get = async () => {
        try {
            dispatch(showLoader())
            const data = await GETREQUEST(endpoints.myanswers)
            dispatch(setPosts(data?.result || []))
            dispatch(hideLoader())
        }
        catch (e) {
            console.log(e);
            dispatch(hideLoader())
        }
    }
    useEffect(() => {
        get()
        return () => {
            dispatch(hideLoader())
        }
    }, [])

    return <FORUM />

}

export default MYAnswers