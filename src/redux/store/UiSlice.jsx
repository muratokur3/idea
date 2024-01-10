import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
    newIdeaPage: false,
    loginPage: false,
    registerPage: false,
};
export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setNewIdeaPage(state, action) {
            state.newIdeaPage = action.payload;
        },
        setLoginPage(state, action) {
            state.loginPage = action.payload;
        },
        setRegisterPage(state, action) {
            state.registerPage = action.payload;
        },
    },
});

export const {setNewIdeaPage,setLoginPage,setRegisterPage} = uiSlice.actions;
export default uiSlice.reducer;
