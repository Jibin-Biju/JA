import React, { useEffect } from 'react'
import FORUM from '../../../../common/Forum'
import { useDispatch } from 'react-redux'
import { setPosts } from '../../../../Store/Features/posts'
import { GETREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice'
function LandingPage() {
    const dispatch = useDispatch()
    useEffect(() => {
        get()
        return () => {
            dispatch(hideLoader())
        }
    }, [])
    const get = async () => {
        try {
            dispatch(showLoader())
            const d = await GETREQUEST(endpoints.getall)
            if (d?.type === "success") {
                dispatch(setPosts(d.result))
            }
            dispatch(hideLoader())
        }
        catch (e) {
            dispatch(hideLoader())
        }
    }
    return <FORUM />

}

export default LandingPage