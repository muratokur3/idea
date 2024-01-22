import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slices/PostSlice"
import UiSlice from "../slices/UiSlice";
import UserSlice from "../slices/UserSlice";
import authSlice from "../slices/AuthSlice";
import hashtagSlice from "../slices/HashtagSlice";
import filterSlice from "../slices/FilterSlice";
import profileSlice from "../slices/ProfileSlice";



const store = configureStore({
    reducer: {
        posts: postSlice,
        ui: UiSlice,
        users: UserSlice,
        authentication: authSlice,
        hashtags: hashtagSlice,
        filterPosts: filterSlice,
        profile: profileSlice,
    },
    });
    export default store;