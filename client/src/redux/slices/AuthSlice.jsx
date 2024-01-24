import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLogin: true,
};

export const authSlice = createSlice({
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

export const { setLogin, setUser } = authSlice.actions;

export default authSlice.reducer;