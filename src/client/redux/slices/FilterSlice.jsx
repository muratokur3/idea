import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterName: "all",
  filterExplore: null,
  // filterProfilePosts:null,
  // filterProfileLikesPosts:0,
};

export const filterSlice = createSlice({
  name: "filterPosts",
  initialState,
  reducers: {
    setFilter: (state, action) => {
        state.filterName = action.payload;
    },
    setFilterExplore: (state, action) => {
      state.filterExplore = action.payload;
    },
    // setFilterProfilePosts: (state, action) => {
    //   state.filterProfilePosts = action.payload;
    // },
    // setFilterProfileLikesPosts: (state, action) => {
    //     state.filterProfileLikesPosts = action.payload;
    // },
    },
});


export const {setFilter,setFilterExplore } = filterSlice.actions;
export default filterSlice.reducer;
