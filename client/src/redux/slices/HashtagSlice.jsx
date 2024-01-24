import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

export const hashtagSlice = createSlice({
    name: "hashtags",
    initialState,
    reducers: {
        setHashtags: (state, action) => {
        return action.payload;
        }
        
    },
    });

export const {setHashtags } = hashtagSlice.actions;

export default hashtagSlice.reducer;
