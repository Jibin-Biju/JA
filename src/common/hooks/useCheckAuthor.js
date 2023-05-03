/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux"

export const useCheckAuthor = (data) => {
    const profile = useSelector(state => state.profile.profile)
    const author = profile?._id || JSON.parse(localStorage.getItem("currentUser"))?._id
    let isAuthor = false,
        isLikedAuthor = false,
        isUnlikedAuthor = false


    if (data?.Author?._id === author) {
        isAuthor = true
    }

    data?.Likes?.liked?.forEach(e => {
        if (e?.id === author) {
            if (e?.type === "like") {
                isLikedAuthor = true
                return
            }
            else if (e?.type === "unlike") {
                isUnlikedAuthor = true
                return
            }

        }
    })

    const isTextAuthor = (id) => {
        if (id === author) {
            return true
        }
    }




    return { isLikedAuthor, isUnlikedAuthor, isAuthor, isTextAuthor }
}

