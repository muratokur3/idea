import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

const initialState = {
  home: [],
  privateMe: [],
  explore: [],
  favorites: [],
  profilePosts: [],
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
      state.favorites= action.payload;
    },
    setProfilePosts: (state, action) => {
      state.profilePosts= action.payload;
    },
    setProfileLikes: (state, action) => {
      state.profileLikes= action.payload;
    }
  },
});

export const {
  setHome,
  setPrivateMe,
  setExplore,
  setFavorites,
  setProfilePosts,
  setProfileLikes,
} = postSlice.actions;
export default postSlice.reducer;
