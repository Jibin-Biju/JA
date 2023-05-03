import { Modal } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'

function ChatRoomMobileMain({ children, active }) {
    const [height, setheight] = useState(window.innerHeight)
    useEffect(() => {
        window.addEventListener("resize", () => setheight(window.innerHeight))
        window.addEventListener("orientationchange", () => setheight(window.innerWidth))
        return () => {
            window.removeEventListener("resize", () => setheight(window.innerHeight))
            window.removeEventListener("orientationchange", () => setheight(window.innerWidth))
        }
    }, [])
    return (
        <Modal
            wrapClassName='chatRoomMainModal mobilemodal'
            bodyStyle={{ height }}
            visible={active}
            footer={false}
            closable={false}>
            {children}
        </Modal>
    )
}

export default ChatRoomMobileMain