import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
    newPostPage: false,
    newProjectPage: false,
    authPage: false,
    authItem:"login",
    registerPage: false,
    profilePage: "info",
};
export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
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
    },
});

export const {setNewPostPage,setNewProjectPage,setAuthPage,setAuthItem,setRegisterPage,setProfilePage} = uiSlice.actions;
export default uiSlice.reducer;
