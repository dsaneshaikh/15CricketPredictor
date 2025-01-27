import React, { useState } from "react";
import LoginForm from "./Popups/Login";
import OTPForm from "./Popups/OtpForm";
import UserRegistration from "../Components/UserRegistration";
import { useSelector } from "react-redux";

function AuthModal() {
  let index = useSelector((state) => state.auth.loginStep);
  const steps = [<LoginForm />, <OTPForm />, <UserRegistration />];

  return steps[index];
}

export default AuthModal;
