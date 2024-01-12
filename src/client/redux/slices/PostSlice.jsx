import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

const initialState = {
  home: [],
  privateMe: [],
  explore: [],
  favorites: [],
  profile: [],
  profileLikes: [],
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
    setFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfileLikes: (state, action) => {
      state.profileLikes.push(action.payload);
    },
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const {
  addPost,
  setHome,
  setPrivateMe,
  setExplore,
  setFavorites,
  setProfile,
  setProfileLikes,
} = postSlice.actions;
export default postSlice.reducer;
