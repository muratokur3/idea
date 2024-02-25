import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterName: "all",
};

export const filterSlice = createSlice({
  name: "filterPosts",
  initialState,
  reducers: {
    setFilter: (state, action) => {
        state.filterName = action.payload;
    },
  
    },
});


export const {setFilter } = filterSlice.actions;
export default filterSlice.reducer;
