import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slices/PostSlice"
import UiSlice from "../slices/UiSlice";
import authSlice from "../slices/AuthSlice";
import hashtagSlice from "../slices/HashtagSlice";
import filterSlice from "../slices/FilterSlice";
import profileSlice from "../slices/ProfileSlice";
import projectSlice from "../slices/ProjectSlice";



const store = configureStore({
    reducer: {
        posts: postSlice,
        ui: UiSlice,
        authentication: authSlice,
        hashtags: hashtagSlice,
        filterPosts: filterSlice,
        profile: profileSlice,
        project: projectSlice,
    },
    });
    export default store;