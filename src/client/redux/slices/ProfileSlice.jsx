import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  surname: "",
  username: "",
  email: "",
  avatar: "",
  followers: [],
  following: [],
  posts: [],
  likes: [],
  createDate: "October 1, 2023",
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.posts = action.payload.posts;
      state.likes = action.payload.likes;
      state.createDate = action.payload.createDate;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
