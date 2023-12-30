import { configureStore } from "@reduxjs/toolkit";
import { ideaSlice } from "./IdeaSlice";


const store = configureStore({
    reducer: {
        ideas: ideaSlice.reducer,
        // users: userSlice.reducer,
        // comments: commentSlice.reducer,
        // notifications: notificationSlice.reducer,
        // messages: messageSlice.reducer,
        // auth: authSlice.reducer,
        // chat: chatSlice.reducer,
    },
    });
    export default store;