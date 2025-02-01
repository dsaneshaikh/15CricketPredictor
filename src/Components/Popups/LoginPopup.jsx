import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../../store/authSlice";

function LoginPopup({ setLoginPopupStatus }) {
  const dispatch = useDispatch();

  const closePopup = () => {
    setLoginPopupStatus(false);
  };

  const handleLoginRegisterClick = () => {
    // Add logic to redirect to login or register flow
    dispatch(showPopup());
    setLoginPopupStatus(false);
  };

  const popupContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-md w-80 text-center"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={closePopup}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          You need to login to start predicting
        </h2>

        {/* Login/Register Button */}
        <button
          onClick={handleLoginRegisterClick}
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-pink-600 transition"
        >
          Login / Register
        </button>

        {/* Cancel Link */}
        <button
          onClick={closePopup}
          className="mt-4 text-sm text-pink-500 font-semibold hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    popupContent,
    document.querySelector("#portal-root")
  );
}

export default LoginPopup;
