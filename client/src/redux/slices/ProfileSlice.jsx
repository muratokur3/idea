import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  surname: "",
  username: "",
  email: "",
  avatar: "",
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
     
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
