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
  },
});

export const { setFollowing,setFollowers } = userSlice.actions;
export default userSlice.reducer;
