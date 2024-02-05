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
      state.home.pagination.page = action.payload.pagination.page;
      state.home.pagination.hasMore = action.payload.pagination.hasMore;
    },
    setPrivateMe: (state, action) => {
      state.privateMe.posts.push(...action.payload.posts);
      state.privateMe.pagination.page = action.payload.pagination.page;
      state.privateMe.pagination.hasMore = action.payload.pagination.hasMore;
    },
    setExplore: (state, action) => {
      if (action.payload.pagination.page === 2) {
        const { posts, pagination } = action.payload;
        state.explore = { posts, pagination };
      } else {
        state.explore.posts.push(...action.payload.posts);
        state.explore.pagination.page = action.payload.pagination;
      }
    },
    setHashtagExplore: (state, action) => {
      if (action.payload.pagination.page === 2) {
        const { posts, pagination } = action.payload;
        state.hashtagExplore = { posts, pagination };
      } else {
        state.hashtagExplore.posts.push(...action.payload.posts);
        state.hashtagExplore.pagination.page = action.payload.pagination.page;
        state.hashtagExplore.pagination.hasMore =
          action.payload.pagination.hasMore;
      }
    },
    setFavorites: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.favorites = action.payload;
      }
      else
      {
      state.favorites.posts.push(...action.payload.posts);
      state.favorites.pagination=action.payload.pagination;
    }
    },
    setProfilePosts: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.profilePosts =action.payload;
      } else {
        state.profilePosts.posts.push(...action.payload.posts);
        state.profilePosts.pagination.page = action.payload.pagination.page;
        state.profilePosts.pagination.hasMore =
          action.payload.pagination.hasMore;
      }
    },
    setProfileLikes: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.profileLikes = action.payload;
      } else {
        state.profileLikes.posts.push(...action.payload.posts);
        state.profileLikes.pagination.page = action.payload.pagination.page;
        state.profileLikes.pagination.hasMore =
          action.payload.pagination.hasMore;
      }
    },
    setLikeData: (state, action) => {
      const {newPost } = action.payload;

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
      state.profileLikes.posts = state.profileLikes.posts
        .map((p) => p._id === newPost._id ? newPost : p
        );
    }
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
  setLikeData,
} = postSlice.actions;
export default postSlice.reducer;