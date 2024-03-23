import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  data:[]
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.data=action.payload;
    }
  },
});

export const { setSearch} = searchSlice.actions;
export default searchSlice.reducer;
