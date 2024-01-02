import { configureStore } from "@reduxjs/toolkit";
import { ideaSlice } from "./IdeaSlice";
import UiSlice from "./UiSlice";


const store = configureStore({
    reducer: {
        ideas: ideaSlice.reducer,
        ui: UiSlice,
        // comments: commentSlice.reducer,
        // notifications: notificationSlice.reducer,
        // messages: messageSlice.reducer,
        // auth: authSlice.reducer,
        // chat: chatSlice.reducer,
    },
    });
    export default store;