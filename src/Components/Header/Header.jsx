import React, { useState, useEffect } from "react";
import Button from "../Button";
import conf from "../../conf/conf";
import AuthModal from "../AuthModal";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, showPopup } from "../../store/authSlice";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
function Header() {
  const authStatus = useSelector((state) => state.auth.login);
  const showPopupStatus = useSelector((state) => state.auth.showPopup);

  return (
    <header className="text-white">
      {/* Top Section */}
      <div className="bg-gradient-to-r  from-[#0B0F65] via-[#0B1490] to-[#0C17AD] h-16 flex justify-between items-center px-8">
        {/* Logo */}
        <img
          src={`${conf.assets}logo.png`}
          alt="Logo"
          className="h-10 w-auto"
        />

        {/* Login/Register */}
        {!authStatus ? <LoginButton /> : <LogoutButton />}
      </div>

      {/* Bottom Section (Navigation Links) */}
      <div className="bg-[#050B4F] h-10 flex items-center justify-center px-8">
        <nav className="flex gap-12 text-base font-medium">
          <NavLink
            to={""}
            className={({ isActive }) =>
              `${
                isActive ? "text-pink-400" : "text-white"
              } hover:text-pink-400 transition duration-300`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-pink-400 transition duration-300"
          >
            Rules
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-pink-400 transition duration-300"
          >
            Terms and Conditions
          </NavLink>
          <NavLink
            to="#"
            className="hover:text-pink-400 transition duration-300"
          >
            Privacy Policy
          </NavLink>
        </nav>
      </div>

      {showPopupStatus && <AuthModal />}
    </header>
  );
}

export default Header;
