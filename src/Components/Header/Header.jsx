import React from "react";
import Button from "../Button";
import conf from "../../conf/conf";
import AuthModal from "../AuthModal";
import HamMenu from "../HamMenu";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showHamMenu, showPopup } from "../../store/authSlice";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

function Header() {
  const authStatus = useSelector((state) => state.auth.login);
  const showPopupStatus = useSelector((state) => state.auth.showPopup);
  const hamMenuStatus = useSelector((state) => state.auth.hamMenu);
  const dispatch = useDispatch();

  const handleHamMenu = () => {
    dispatch(showHamMenu());
  };

  return (
    <>
      {hamMenuStatus && <HamMenu />}
      <header className="text-white">
        {/* Top Section */}
        <div className="hidden sm:flex bg-gradient-to-r from-[#0B0F65] via-[#0B1490] to-[#0C17AD] h-16 justify-between items-center px-8">
          {/* Logo */}
          <img src={`${conf.assets}logo.png`} alt="Logo" className="w-14" />

          {/* Login/Register */}
          {!authStatus ? <LoginButton /> : <LogoutButton />}
        </div>

        {/* Bottom Section (Navigation Links) */}
        <div className="bg-[#050B4F] h-10 flex items-center px-2 sm:justify-center">
          {/* Hamburger Menu (Visible on small screens) */}
          <div onClick={handleHamMenu} className="flex sm:hidden px-1">
            <img
              className="h-10"
              src={`${conf.assets}hamburger_white.png`}
              alt="Menu"
            />
          </div>

          {/* Logo (Centered Horizontally) */}
          <div className="flex flex-grow justify-center relative right-4  sm:hidden">
            <img
              src={`${conf.assets}logo.png`}
              alt="Logo"
              className="h-12 w-auto "
            />
          </div>

          {/* Navigation Links (Hidden on small screens, visible from sm onwards) */}
          <nav className="hidden sm:flex justify-center items-center gap-12 text-base font-medium">
            <NavLink
              to=""
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
    </>
  );
}

export default Header;
