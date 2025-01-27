import React from "react";
import conf from "../conf/conf";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
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
