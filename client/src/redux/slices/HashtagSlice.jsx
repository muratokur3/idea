import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    hashtags: [],
    hashtagsExplore: [],
};

export const hashtagSlice = createSlice({
    name: "hashtags",
    initialState,
    reducers: {
        setHashtags: (state, action) => {
            state.hashtags = action.payload;
        },
        setHashtagsExplore: (state, action) => {
            state.hashtagsExplore = action.payload;
        }
        
    },
    });

export const {setHashtags,setHashtagsExplore } = hashtagSlice.actions;

export default hashtagSlice.reducer;
