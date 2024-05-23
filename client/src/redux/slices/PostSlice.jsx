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
  hashtagExplore: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  Myfavorites: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  myLikes: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home.posts.push(...action.payload.posts);
      state.home.pagination = action.payload.pagination;
    },
    setPrivateMe: (state, action) => {
      state.privateMe.posts.push(...action.payload.posts);
      state.privateMe.pagination = action.payload.pagination;
    },
    setExplore: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.explore = action.payload;
      } else {
        state.explore.posts.push(...action.payload.posts);
        state.explore.pagination = action.payload.pagination;
      }
    },
    setHashtagExplore: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.hashtagExplore = action.payload;
      } else {
        state.hashtagExplore.posts.push(...action.payload.posts);
        state.hashtagExplore.pagination = action.payload.pagination;
      }
    },
    setMyFavorites: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.Myfavorites = action.payload;
      } else {
        state.Myfavorites.posts.push(...action.payload.posts);
        state.Myfavorites.pagination = action.payload.pagination;
      }
    },
    setMyLikes: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.myLikes = action.payload;
      } else {
        state.myLikes.posts.push(...action.payload.posts);
        state.myLikes.pagination = action.payload.pagination;
      }
    },
    createSinglePost:(state,action)=>{
      console.log(action.payload)
      state.home.posts.unshift(action.payload);
    },
    setUbdateData: (state, action) => {
      const newPost = action.payload;
      state.home.posts = state.home.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.privateMe.posts = state.privateMe.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.explore.posts = state.explore.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.hashtagExplore.posts = state.hashtagExplore.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.Myfavorites.posts = state.Myfavorites.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.myLikes.posts = state.myLikes.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
    },
    deleteSinglePost: (state, action) => {
      const postId = action.payload;
      state.home.posts = state.home.posts.filter((p) => p._id !== postId);
      state.privateMe.posts = state.privateMe.posts.filter(
        (p) => p._id !== postId
      );
      state.explore.posts = state.explore.posts.filter((p) => p._id !== postId);
      state.hashtagExplore.posts = state.hashtagExplore.posts.filter(
        (p) => p._id !== postId
      );
      state.Myfavorites.posts = state.Myfavorites.posts.filter(
        (p) => p._id !== postId
      );
      state.myLikes.posts = state.myLikes.posts.filter((p) => p._id !== postId);
    },
  },
});

export const {
  setHome,
  setPrivateMe,
  setExplore,
  setHashtagExplore,
  setMyFavorites,
  setMyLikes,
  createSinglePost,
  setUbdateData,
  deleteSinglePost,
} = postSlice.actions;
export default postSlice.reducer;
