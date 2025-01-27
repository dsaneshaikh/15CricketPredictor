import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import dataService from "./services/config";
import { Outlet } from "react-router-dom";

function App() {
  // useEffect(() => {
  //   dataService
  //     .getFeed()
  //     .then((response) => console.log(response.data.value.length))
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
