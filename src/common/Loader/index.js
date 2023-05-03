import { Grid, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader } from '../../Store/Features/LoaderSlice'

function Loader() {
    const breakpoints = Grid.useBreakpoint()
    const dispatch = useDispatch()
    const state = useSelector(state => state.loader.isLoading)


    useEffect(() => {
        var timeout;
        var func = () => dispatch(hideLoader())
        if (breakpoints['xs'] === true) {
            timeout = setTimeout(() => {
                dispatch(hideLoader())
                window.removeEventListener("load", func)
            }, 3000);
        }
        else {
            window.addEventListener("load", () => func)
        }
        return () => {
            window.removeEventListener("load", func)
            clearTimeout(timeout)
        }
    }, [breakpoints, dispatch])
    if (!state) return null
    document.body.style.height = undefined
    return (
        <Row className='loader fullpage'>
            <Spin size="large" />
        </Row>
    )
}

export default Loader