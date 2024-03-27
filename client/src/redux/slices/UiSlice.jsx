import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "dark",
  lightTheme: {
    palette: {
      mode: "light",
      primary: { main: "rgb(0,0,0)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(255, 255, 255)" },
      postBackground: {
        default: "linear-gradient(to top, #ffffff, #b9b6b670)",
      },
    },
    typography: {
      fontFamily: "monospace",
      fontSize: 16,
    },
  },
  darkTheme: {
    palette: {
      mode: "dark",
      primary: { main: "rgb(250, 250, 250)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(0, 0, 0)" },
      postBackground: { default: "linear-gradient(to top, #000000, #1a1919)" },
    },
    typography: {
      fontFamily: "monospace",
      fontSize: 16,
    },
  },
  useTheme: {
    palette: {
      mode: "dark",
      primary: { main: "rgb(250, 250, 250)" },
      secondary: { main: "rgba(112, 106, 106, 0.937)" },
      background: { default: "rgb(0, 0, 0)" },
      postBackground: { default: "linear-gradient(to top, #000000, #1a1919)" },
    },
    typography: {
      fontFamily: "monospace",
      fontSize: 16,
    },
  },
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      if (action.payload === "light") {
        state.themeMode = "light";
        state.useTheme = state.lightTheme;
      } else {
        state.themeMode = "dark";
        state.useTheme = state.darkTheme;
      }
    },
  },
});

export const {
  setThemeMode,
} = uiSlice.actions;
export default uiSlice.reducer;
