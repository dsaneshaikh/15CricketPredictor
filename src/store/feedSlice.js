import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  feedData: null,
  feedShowPopup: false,
  popupMatchId: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    feedDispatch: (state, action) => {
      state.feedData = action.payload;
    },
    feedShowPopup: (state, action) => {
      state.feedShowPopup = action.payload;
      state.popupMatchId = action.payload.matchId;
    },
  },
});

export const { feedDispatch, feedShowPopup } = feedSlice.actions;

export default feedSlice.reducer;
