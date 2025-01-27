import React, { useState } from "react";
import Button from "../Button";
import dataService from "../../services/config";
import ReactDom from "react-dom";
import { showPopup, loginStep, email } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const [emailInput, setEmailInput] = useState(
    useSelector((state) => state.auth.email)
  );
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    dataService
      .LoginEmail(emailInput)
      .then((res) => {
        res.meta.respCode && dispatch(loginStep(true));
        dispatch(email(emailInput));
      })
      .catch((e) => console.log(e));
  };

  const closePopup = () => {
    dispatch(showPopup());
  };

  const popupContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-900">
            Login / Register
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Logged in via Mobile Number in the past?{" "}
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              Click Here
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Input */}
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          {/* Terms */}
          <p className="text-xs text-gray-700 text-center">
            By continuing, I agree to the Cricket Predictor's{" "}
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-500 font-semibold hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit Button */}
          {
            <Button
              type="submit"
              className={`bg-pink-500 text-white font-bold py-2 rounded-lg ${
                submit ? "pointer-events-none" : ""
              } hover:bg-pink-600 transition`}
              children="Continue"
            />
          }
        </form>
      </div>
    </div>
  );
  return ReactDom.createPortal(
    popupContent,
    document.querySelector("#portal-root")
  );
}

export default LoginForm;
