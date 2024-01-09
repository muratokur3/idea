import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ideaSlice = createSlice({
    name: "ideas",
    initialState,
    reducers: {
        addIdea: (state, action) => {
        state.push(action.payload);
        },
        deleteIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].isDeleted = true;
        },
        likeIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].likesUserId.push(1);
        },
        unlikeIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].likesUserId.pop(1);
        },
    },
    });

    export const { addIdea, deleteIdea, likeIdea, unlikeIdea } = ideaSlice.actions;
    export default ideaSlice.reducer;