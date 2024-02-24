import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // posts: [],
  users: [
],
  hashtags: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.users = action.payload.users;
      state.hashtags = action.payload.hashtags;
    }
  },
});

export const { setSearch} = searchSlice.actions;
export default searchSlice.reducer;
