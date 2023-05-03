import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    postdata: {},
}

export const Postlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPostdata: (state, action) => {
            state.postdata = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPosts, setPostdata } = Postlice.actions

export default Postlice.reducer