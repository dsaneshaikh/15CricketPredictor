import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPredictions: [],
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    predictionDispatch: (state, action) => {
      if (action.payload.length > 0) {
        action.payload.forEach((prediction) => {
          const existingIndex = state.userPredictions.findIndex(
            (statePrediction) => statePrediction.matchId === prediction.matchId
          );

          if (existingIndex !== -1) {
            // Update the existing prediction
            state.userPredictions[existingIndex] = prediction;
          } else {
            // Add the new prediction
            state.userPredictions.push(prediction);
          }
        });
      }
    },
    predictionReset: (state) => {
      state.userPredictions = [];
    },
  },
});

export const { predictionDispatch, predictionReset } = predictionSlice.actions;

export default predictionSlice.reducer;
