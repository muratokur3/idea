import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  pagination: {
    page: 1,
    hasMore: true,
  },
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      if (action.payload.pagination.page === 2) {
        state.projects = action.payload.projects;
      } else {
        state.projects.push(...action.payload.projects);
      }
      state.pagination = action.payload.pagination;
    },
    setNewProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
  },
});

export const { setProjects, setNewProject } = projectSlice.actions;
export default projectSlice.reducer;
