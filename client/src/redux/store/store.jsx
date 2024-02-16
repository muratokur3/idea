import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slices/PostSlice"
import UiSlice from "../slices/UiSlice";
import authSlice from "../slices/AuthSlice";
import hashtagSlice from "../slices/HashtagSlice";
import filterSlice from "../slices/FilterSlice";
import profileSlice from "../slices/ProfileSlice";
import projectSlice from "../slices/ProjectSlice";
import searchSlice  from "../slices/SearchSlice";



const store = configureStore({
    reducer: {
        posts: postSlice,
        ui: UiSlice,
        authentication: authSlice,
        hashtags: hashtagSlice,
        filterPosts: filterSlice,
        profile: profileSlice,
        project: projectSlice,
        search: searchSlice,
    },
    });
    export default store;