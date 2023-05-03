import { configureStore } from '@reduxjs/toolkit'
import ProfileSliceReducer from "./Features/ProfileSlice"
import LoaderReducer from "./Features/LoaderSlice"
import DataSlice from "./Features/DataSlice";
import PostSlice from "./Features/posts";

export const store = configureStore({
    reducer: {
        profile: ProfileSliceReducer,
        loader: LoaderReducer,
        data: DataSlice,
        post: PostSlice,
    },
})