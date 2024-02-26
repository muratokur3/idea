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
  favorites: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  profilePosts: {
    posts: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  profileLikes: {
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
    setFavorites: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.favorites = action.payload;
      } else {
        state.favorites.posts.push(...action.payload.posts);
        state.favorites.pagination = action.payload.pagination;
      }
    },
    setProfilePosts: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.profilePosts = action.payload;
      } else {
        state.profilePosts.posts.push(...action.payload.posts);
        state.profilePosts.pagination = action.payload.pagination;
      }
    },
    setProfileLikes: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.profileLikes = action.payload;
      } else {
        state.profileLikes.posts.push(...action.payload.posts);
        state.profileLikes.pagination = action.payload.pagination;
      }
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
      state.favorites.posts = state.favorites.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.profilePosts.posts = state.profilePosts.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.profileLikes.posts = state.profileLikes.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
    },
  },
});

export const {
  setHome,
  setPrivateMe,
  setExplore,
  setHashtagExplore,
  setFavorites,
  setProfilePosts,
  setProfileLikes,
  setUbdateData,
} = postSlice.actions;
export default postSlice.reducer;
