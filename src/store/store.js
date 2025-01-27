import { configureStore } from "@reduxjs/toolkit";
import authSlicereducer from "./authSlice";
import feedSlicereducer from "./feedSlice";
export const store = configureStore({
  reducer: {
    auth: authSlicereducer,
    feed: feedSlicereducer,
  },
});
