import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  following: [],
  followers: [],

};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    ubdateUserFollow: (state, action) => {
      const { newUser } = action.payload;
      state.following = state.following.map((user) =>
        user._id === newUser._id ? newUser : user
      );
      state.followers = state.followers.map((user) =>
        user._id === newUser._id ? newUser : user
      );
      
    },
  },
});

export const { setFollowing,setFollowers,ubdateUserFollow } = userSlice.actions;
export default userSlice.reducer;
