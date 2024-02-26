import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogin: false,
  hashtags: [],
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginedHashtags: (state, action) => {
      state.hashtags = action.payload;
    },
    updateUserHashtag: (state, action) => {
      const hashtagName = action.payload;
      console.log(hashtagName);

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

export const { setLogin, setUser,setLoginedHashtags,updateUserHashtag } = authSlice.actions;

export default authSlice.reducer;
