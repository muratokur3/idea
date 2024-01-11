import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slices/PostSlice"
import UiSlice from "../slices/UiSlice";
import UserSlice from "../slices/UserSlice";
import authenticationSlice from "../slices/AuthenticationSlice";
import hashtagSlice from "../slices/HashtagSlice";
import filterSlice from "../slices/FilterSlice";



const store = configureStore({
    reducer: {
        posts: postSlice,
        ui: UiSlice,
        users: UserSlice,
        authentication: authenticationSlice,
        hashtags: hashtagSlice,
        filterPosts: filterSlice,
       
    },
    });
    export default store;