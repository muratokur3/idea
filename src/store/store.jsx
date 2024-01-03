import { configureStore } from "@reduxjs/toolkit";
import { ideaSlice } from "./IdeaSlice";
import UiSlice from "./UiSlice";
import UserSlice from "./UserSlice";
import authenticationSlice  from "./AuthenticationSlice";
import { hashtagSlice } from "./HashtagSlice";


const store = configureStore({
    reducer: {
        ideas: ideaSlice.reducer,
        ui: UiSlice,
        users: UserSlice,
        authentication: authenticationSlice,
        hashtags: hashtagSlice.reducer,
        // comments: commentSlice.reducer,
        // notifications: notificationSlice.reducer,
        // messages: messageSlice.reducer,
        // auth: authSlice.reducer,
        // chat: chatSlice.reducer,
    },
    });
    export default store;