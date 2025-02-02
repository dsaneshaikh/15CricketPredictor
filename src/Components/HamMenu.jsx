import React from "react";
import Button from "./Button";
import conf from "../conf/conf";
import { useDispatch, useSelector } from "react-redux";
import { showHamMenu } from "../store/authSlice";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const HamMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.hamMenu);
  const authStatus = useSelector((state) => state.auth.login);
  const closePopup = () => {
    dispatch(showHamMenu());
  };

  return (
    <div
      className={`fixed inset-0 flex items-start bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={closePopup}
    >
      <header
        onClick={(e) => e.stopPropagation()}
        className={`text-white bg-[#050B4F] h-screen flex flex-col w-96 px-8 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative top-10">
          {/* Login/Register */}
          {!authStatus ? <LoginButton /> : <LogoutButton />}
        </div>
        <nav className="flex flex-col gap-8 text-base font-medium relative top-40">
          <NavLink
            to=""
            className={(isActive) =>
              `${
                isActive ? "text-pink-400" : "text-white"
              } text-white "hover:text-pink-400 transition duration-300"`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className="text-white hover:text-pink-400 transition duration-300"
          >
            Rules
          </NavLink>
          <NavLink
            to="#"
            className="text-white hover:text-pink-400 transition duration-300"
          >
            Terms and Conditions
          </NavLink>
          <NavLink
            to="#"
            className="text-white hover:text-pink-400 transition duration-300"
          >
            Privacy Policy
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default HamMenu;
