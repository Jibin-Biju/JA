import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { hideLoader, showLoader } from '../../Store/Features/LoaderSlice';
function GetLoader() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showLoader())
        return () => {
            dispatch(hideLoader())
        }
    }, [dispatch])
    return null
}

export default GetLoader