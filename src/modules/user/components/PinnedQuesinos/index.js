import React, { useEffect, } from 'react'
import FORUM from '../../../../common/Forum'
import { useDispatch } from 'react-redux'
import { setPosts } from '../../../../Store/Features/posts'
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice'
import { GETREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
function PinnedQuesinos() {
    const dispatch = useDispatch()
    useEffect(() => {
        get()
        return () => {
            dispatch(hideLoader())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const get = async () => {
        try {
            dispatch(showLoader())
            const data = await GETREQUEST(endpoints.saved)
            dispatch(setPosts(data?.result || []))
            dispatch(hideLoader())
        }
        catch (e) {
            dispatch(hideLoader())
        }
    }
    return <FORUM />

}

export default PinnedQuesinos