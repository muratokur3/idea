import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
        return action.payload;
        },
        setNewProject: (state, action) => {
        return [action.payload, ...state];
        }
    },
    });

export const { setProjects,setNewProject } = projectSlice.actions;
export default projectSlice.reducer;