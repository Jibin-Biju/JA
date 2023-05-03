import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filtervalue: "",
  loading: false,
};

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFiltervalue: (state, action) => {
      state.filtervalue = action.payload;
    },
    load: (state) => {
      state.loading = true;
    },
    unload: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData, load, unload, setFiltervalue } = DataSlice.actions;

export default DataSlice.reducer;
