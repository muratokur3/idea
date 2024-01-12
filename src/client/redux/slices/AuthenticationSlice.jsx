import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLogin: false,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        
    },
});

export const { setLogin, setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;