import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
    newPostPage: false,
    authPage: false,
    authItem:"login",
    registerPage: false,
    profilePage: "posts",

    
};
export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setNewPostPage(state, action) {
            state.newPostPage = action.payload;
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

export const {setNewPostPage,setAuthPage,setAuthItem,setRegisterPage,setProfilePage} = uiSlice.actions;
export default uiSlice.reducer;
