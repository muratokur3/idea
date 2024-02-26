import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  followers: [],
  following: [],
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    ubdateUserFollow: (state, action) => {
      const newUser = action.payload;
      state.following = state.following.map((user) =>
        user._id === newUser._id ? newUser : user
      );

      state.followers = state.followers.map((user) =>
        user._id === newUser._id ? newUser : user
      );
      state.user = {
        ...state.user,
        followers: new Set(state.user.followers).has(newUser._id)
          ? state.user.followers.filter((id) => id !== newUser._id)
          : [...state.user.followers, newUser._id],
      };
    },
   
  },
});

export const {
  setProfile,
  setFollowers,
  setFollowing,
  ubdateUserFollow,
} = profileSlice.actions;
export default profileSlice.reducer;
