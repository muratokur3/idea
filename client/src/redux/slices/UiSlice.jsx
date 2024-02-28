import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "Dark",
  lightTheme: {
    palette: {
      primary: { main: "rgb(0,0,0)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(255, 255, 255)"},
      postBackground: { default: "linear-gradient(to top, #ffffff, #b9b6b670)" },
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 16,
    },
  },
  darkTheme: {
    palette: {
      primary: { main: "rgb(250, 250, 250)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(0, 0, 0)" },
      postBackground: { default: "linear-gradient(to top, #000000, #1a1919)" },
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 16,
    },
  },
  useTheme: {
    palette: {
      primary: { main: "rgb(0,0,0)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(255, 255, 255)" },
      postBackground: { default: "linear-gradient(to top, #ffffff, #b9b6b670)" },
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 16,
    },
  },
  newPostPage: false,
  newProjectPage: false,
  authPage: false,
  authItem: "login",
  registerPage: false,
  profilePage: "posts",
  editProfilePage: false,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      if (action.payload === "Light") {
        state.themeMode = "Light";
      state.useTheme = state.lightTheme;
      } else {
        state.themeMode = "Dark";
        state.useTheme = state.darkTheme;
      }
    },
    setNewPostPage(state, action) {
      state.newPostPage = action.payload;
    },
    setNewProjectPage(state, action) {
      state.newProjectPage = action.payload;
    },
    setAuthPage(state, action) {
      state.authPage = action.payload;
    },
    setAuthItem(state, action) {
      state.authItem = action.payload;
    },
    setRegisterPage(state, action) {
      state.registerPage = action.payload;
    },
    setProfilePage(state, action) {
      state.profilePage = action.payload;
    },
    setEditProfilePage(state, action) {
      state.editProfilePage = action.payload;
    },
  },
});

export const {
  setThemeMode,
  setNewPostPage,
  setNewProjectPage,
  setAuthPage,
  setAuthItem,
  setRegisterPage,
  setProfilePage,
  setEditProfilePage,
} = uiSlice.actions;
export default uiSlice.reducer;
