import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  followers: {
    users: [],
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  following: {
    users: [],
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
  projects: {
    projects: [],
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
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    setFollowing: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.following = action.payload;
      } else {
        state.following.users.push(...action.payload.users);
        state.following.pagination = action.payload.pagination;
      }
    },
    setFollowers: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.followers = action.payload;
      } else {
        state.followers.users.push(...action.payload.users);
        state.followers.pagination = action.payload.pagination;
      }
    },
    ubdateUserFollow: (state, action) => {
      const newUser = action.payload;

      state.following.users = state.following.users.map((user) =>
        user._id === newUser._id ? newUser : user
      );

      state.followers.users = state.followers.users.map((user) =>
        user._id === newUser._id ? newUser : user
      );
      // state.user = {
      //   ...state.user,
      //   followers: new Set(state.user.followers).has(newUser._id)
      //     ? state.user.followers.filter((id) => id !== newUser._id)
      //     : [...state.user.followers, newUser._id],
      // };
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
    setProjects: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.projects = action.payload.projects;
      } else {
        state.projects.push(...action.payload.projects);
      }
      state.pagination = action.payload.pagination;
    },
    setNewProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    setUpdateProfilePosts:(state, action) => {
      const newPost = action.payload;
      state.profilePosts.posts = state.profilePosts.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
      state.favorites.posts = state.favorites.posts.map((p) =>
        p._id === newPost._id ? newPost : p
      );
     
    },
  },
});

export const {
  setProfile,
  setFollowers,
  setFollowing,
  setFavorites,
  setProfilePosts,
  ubdateUserFollow,
  üsetProjects,
  setNewProject,
  setUpdateProfilePosts,
} = profileSlice.actions;
export default profileSlice.reducer;
