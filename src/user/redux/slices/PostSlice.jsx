import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

// const initialState = {
//   home:[],
//   homeMe:[],
//   explore:[],
//   profilePosts:[],
//   profileLikesPosts:[],
  
// };


export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state, action) => {
      return action.payload;
    },
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload);
      state[index].isDeleted = true;
    },
    likePost: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload);
      state[index].likesUserId.push(1);
    },
    unlikePost: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload);
      state[index].likesUserId.pop(1);
    },
  },
});

export const { setPost, addPost, deletePost, likePost, unlikePost } =
  postSlice.actions;
export default postSlice.reducer;
