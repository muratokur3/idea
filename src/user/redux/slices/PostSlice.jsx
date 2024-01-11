import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

const initialState = {
  home:[],
  privateMe:[],
  explore:[],
  profile:[],
  profileLikes:[],
};


export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setPrivateMe: (state, action) => {
      state.privateMe = action.payload;
    },
    setExplore: (state, action) => {
      state.explore = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    addPost: (state, action) => {
      state.push(action.payload);
    },
   
  },
});

export const { setHome,addPost,setExplore,setProfile } =
  postSlice.actions;
export default postSlice.reducer;
