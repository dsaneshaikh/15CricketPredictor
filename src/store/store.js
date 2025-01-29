import { configureStore } from "@reduxjs/toolkit";
import authSlicereducer from "./authSlice";
import feedSlicereducer from "./feedSlice";
import predictionreducer from "./predictionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlicereducer,
    feed: feedSlicereducer,
    prediction: predictionreducer,
  },
});
