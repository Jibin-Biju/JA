import { createSlice } from '@reduxjs/toolkit'
let profile = localStorage.getItem("currentUser")
profile = JSON.parse(profile ? profile : "{}")
const initialState = {
    profile: profile || {},
    user: {},
    loading: false,
}

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
            if (action.payload === null) {
                localStorage.removeItem("currentUser")
                localStorage.removeItem("userToken");
            }
            else
                localStorage.setItem("currentUser", JSON.stringify(action.payload))
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        load: (state) => { state.loading = true },
        unload: (state) => { state.loading = false },
    },
})

// Action creators are generated for each case reducer function
export const { setProfile, load, unload, setUser } = ProfileSlice.actions
export const PROFILE = (state, action) => state.profile.profile
export const isLoading = (state) => state.profile.loading

export default ProfileSlice.reducer