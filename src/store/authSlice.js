import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  showPopup: false,
  loginStep: 0,
  email: "",
  userData: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = true;
    },

    logout: (state, action) => {
      state.login = false;
      state.loginStep = 0;
    },

    showPopup: (state) => {
      state.showPopup = !state.showPopup;
    },

    loginStep: (state, action) => {
      if (action.payload) {
        state.loginStep += 1;
      } else {
        state.loginStep -= 1;
      }
    },

    email: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { login, logout, showPopup, loginStep, email } = authSlice.actions;

export default authSlice.reducer;
