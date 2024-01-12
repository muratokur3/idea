import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

export const hashtagSlice = createSlice({
    name: "hashtags",
    initialState,
    reducers: {
        setHashtags: (state, action) => {
        return action.payload;
        },
        addHashtag: (state, action) => {
        state.push(action.payload);
        },
        removeHashtag: (state, action) => {
        state.filter((hashtag) => hashtag !== action.payload);
        },
    },
    });

export const {setHashtags, addHashtag, removeHashtag } = hashtagSlice.actions;

export default hashtagSlice.reducer;
