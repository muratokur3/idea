import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
    newPostPage: false,
    loginPage: false,
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
        setLoginPage(state, action) {
            state.loginPage = action.payload;
        },
        setRegisterPage(state, action) {
            state.registerPage = action.payload;
        },
        setProfilePage(state, action) {
            state.profilePage = action.payload;
        },
    },
});

export const {setNewPostPage,setLoginPage,setRegisterPage,setProfilePage} = uiSlice.actions;
export default uiSlice.reducer;
