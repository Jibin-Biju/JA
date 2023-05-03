import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        isLoading: true, // fullpage
        isContentLoading: false, //content
        count: 0,
    },
    reducers: {
        showLoader: (state, action) => {
            if (action.payload === "content") {
                state.isContentLoading = true;
            } else {
                state.count += 1;
                if (state.count > 0) {
                    state.isLoading = true;
                }
            }
        },
        hideLoader: (state, action) => {
            if (action.payload === "content") {
                state.isContentLoading = false;
            } else {
                if (state.count > 0) state.count -= 1;

                if (state.count < 1) {
                    state.isLoading = false;
                }
            }
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
