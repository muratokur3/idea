import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.map((user) => {
        if (user.id === action.payload.id) {
          user = action.payload;
        }
      });
    },
  },
});

export const { addUser, deleteUser, updateUser,getUsers } = userSlice.actions;
export default userSlice.reducer;
