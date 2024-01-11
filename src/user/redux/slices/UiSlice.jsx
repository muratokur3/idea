import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
    newPostPage: false,
    loginPage: false,
    registerPage: false,
    
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
    },
});

export const {setNewPostPage,setLoginPage,setRegisterPage} = uiSlice.actions;
export default uiSlice.reducer;
