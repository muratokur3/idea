import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

const initialState = {
  home: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  privateMe: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  explore: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  favorites: [],
  profilePosts: [],
  profileLikes: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home.posts.push(...action.payload.posts);
      state.home.pagination.page = action.payload.pagination.page;
      state.home.pagination.hasMore = action.payload.pagination.hasMore;
    },
    setPrivateMe: (state, action) => {
      state.privateMe.posts.push(...action.payload.posts);
      state.privateMe.pagination.page = action.payload.pagination.page;
      state.privateMe.pagination.hasMore = action.payload.pagination.hasMore;
    },
    setExplore: (state, action) => {
      state.explore.posts.push(...action.payload.posts);
      state.explore.pagination.page = action.payload.pagination.page;
      state.explore.pagination.hasMore = action.payload.pagination.hasMore;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setProfilePosts: (state, action) => {
      state.profilePosts = action.payload;
    },
    setProfileLikes: (state, action) => {
      state.profileLikes = action.payload;
    },
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
