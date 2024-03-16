import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer, sessionService } from "redux-react-session";
import postSlice from "../slices/PostSlice";
import UiSlice from "../slices/UiSlice";
import hashtagSlice from "../slices/HashtagSlice";
import filterSlice from "../slices/FilterSlice";
import profileSlice from "../slices/ProfileSlice";
import projectSlice from "../slices/ProjectSlice";
import searchSlice from "../slices/SearchSlice";

const validateSession = () => {
    return true;
  }
const options = { refreshOnCheckAuth: true, redirectPath: '/', validateSession };

const store = configureStore(
  {
    reducer: {
      session: sessionReducer,
      posts: postSlice,
      ui: UiSlice,
      hashtags: hashtagSlice,
      filterPosts: filterSlice,
      profile: profileSlice,
      project: projectSlice,
      search: searchSlice,
    },
  },
);
sessionService.initSessionService(store, options)
export default store;
