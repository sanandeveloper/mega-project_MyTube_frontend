import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
  },
  reducers: {
    SearchText: (state, action) => {
      state.text = action.payload;
      console.log("state.text",state.text)
    },
  },
});

export const { SearchText } = searchSlice.actions;
export default searchSlice.reducer;
