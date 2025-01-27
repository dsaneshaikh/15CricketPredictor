import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import conf from "../../conf/conf";
import Input from "../Input";
import dataService from "../../services/config";
import { login, loginStep, showPopup } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const OTPForm = () => {
  const [timer, setTimer] = useState(30);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);

  const closePopup = () => {
    dispatch(showPopup());
  };

  const resendOtp = () => {
    dataService
      .LoginEmail(email)
      .then((res) => res.meta.respCode)
      .catch((e) => console.log(e));
    setTimer(30);
    console.log(timer);
  };

  const previousPage = () => {
    dispatch(loginStep(false));
  };

  const handleInput = (e, index) => {
    const { value } = e.target;

    if (value.length === 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    } else if (value.length === 0 && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1].focus();
    }

    const otp = inputsRef.current.map((input) => input.value).join("");
    if (otp.length === inputsRef.current.length) {
      dataService
        .LoginEmailVerify(otp, email)
        .then((res) => {
          console.log(inputsRef.current);
          if (res.meta.respCode === 1) {
            console.log("OTP Verified Successfully", res);
            if (res.data.value.isRegistered) {
              dispatch(login());
              dispatch(loginStep(false));
              dispatch(showPopup());
            } else {
              dispatch(loginStep(true));
            }
          } else {
            setInvalidOtp(true);
            console.error("OTP Verification Failed");
          }
        })
        .catch((e) => console.error("API Error:", e));
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const popupContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white shadow-lg p-6 w-full max-w-sm rounded-lg"
      >
        <div
          onClick={previousPage}
          className=" cursor-pointer hover:opacity-80"
        >
          <img className="h-7" src={`${conf.assets}turn-back.png`} alt="" />
        </div>
        {/* Header */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-200 rounded-full p-3">
            <img className="h-20" src={`${conf.assets}email.png`} alt="" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          OTP sent to <span className="text-pink-600">{email}</span>
        </p>
        <div className="flex justify-between mb-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <Input
                onChange={(e) => handleInput(e, index)}
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => {
                  if (el) inputsRef.current[index] = el; // Add only non-null refs
                }}
                className="w-12 h-12 border rounded-lg text-center text-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            ))}
        </div>

        <div className="text-center text-gray-600">
          {invalidOtp && (
            <p className="text-pink-500 font-semibold ">
              Invalid OTP. Please enter correct OTP!
            </p>
          )}

          {timer <= 0 ? (
            <p
              onClick={resendOtp}
              className="text-pink-600 font-semibold cursor-pointer hover:opacity-80"
            >
              Resend OTP
            </p>
          ) : (
            <p>
              Didn’t receive the OTP?{" "}
              <span className="text-pink-600 font-semibold">{`00:${timer
                .toString()
                .padStart(2, "0")}`}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    popupContent,
    document.getElementById("portal-root")
  );
};

export default OTPForm;
