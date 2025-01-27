import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedData: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    feedDispatch: (state, action) => {
      state.feedData = action.payload;
    },
  },
});

export const { feedDispatch } = feedSlice.actions;

export default feedSlice.reducer;
