import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import dataService from "./services/config";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { predictionDispatch } from "./store/predictionSlice";
import { feedDispatch } from "./store/feedSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dataService
      .getPrediction()
      .then((response) => dispatch(predictionDispatch(response.data.value)))
      .catch((e) => console.log(e));
  });

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
