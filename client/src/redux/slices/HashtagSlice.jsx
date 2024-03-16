import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    LogginedUserHashtags: [],
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
        },
        updateUserHashtag: (state, action) => {
            const hashtagName = action.payload;
            // state.user.hashtags değeri var mı kontrol ediliyor, yoksa boş bir dizi kullanılıyor
            const currentHashtags = state.hashtags || [];
            return {
              ...state,
              hashtags: currentHashtags.includes(hashtagName)
                ? currentHashtags.filter((name) => name !== hashtagName)
                : [...currentHashtags, hashtagName],
            };
          },
        
    },
    });

export const {setHashtags,setHashtagsExplore,updateUserHashtag } = hashtagSlice.actions;

export default hashtagSlice.reducer;
