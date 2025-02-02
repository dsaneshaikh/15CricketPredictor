import React from "react";
import conf from "../conf/conf";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { showPopup, loginStep, showHamMenu } from "../store/authSlice";

function LoginButton() {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(showPopup());
      }}
      className="flex items-center gap-2 cursor-pointer "
    >
      <img
        className="h-5"
        src={`${conf.assets}Login_Icon_White_transparent.png`}
        alt="Login Icon"
      />
      <Button
        children="Login/Register"
        className="bg-transparent border-transparent text-white hover:underline "
      />
    </div>
  );
}

export default LoginButton;
