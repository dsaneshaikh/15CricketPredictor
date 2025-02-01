import React from "react";
import conf from "../conf/conf";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { feedReset } from "../store/feedSlice";
import { predictionReset } from "../store/predictionSlice";
function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(predictionReset());
    document.cookie =
      "CricPred_101=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie =
      "CricPred_111=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  };

  return (
    <div
      onClick={logoutHandler}
      className="flex items-center gap-2 cursor-pointer "
    >
      <img
        className="h-5"
        src={`${conf.assets}Login_Icon_White_transparent.png`}
        alt="Login Icon"
      />
      <Button
        children="Logout"
        className="bg-transparent border-transparent text-white hover:underline "
      />
    </div>
  );
}

export default LogoutButton;
