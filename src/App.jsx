import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import dataService from "./services/config";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { predictionDispatch } from "./store/predictionSlice";
import { feedDispatch } from "./store/feedSlice";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  let authStatus = useSelector((state) => state.auth.login);

  function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  function decodeBase64Cookie(cookieValue) {
    return decodeURIComponent(cookieValue);
  }

  useEffect(() => {
    if (authStatus) {
      dataService
        .getPrediction()
        .then((response) => {
          if (response) {
            dispatch(predictionDispatch(response.data.value));
          }
        })
        .catch((e) => console.log(e));
    }
    const cookie = getCookie("CricPred_111");

    if (cookie) {
      dispatch(login());
    }
  }, [authStatus]);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
