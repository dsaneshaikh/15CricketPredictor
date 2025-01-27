import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import conf from "../conf/conf";
import dataService from "../services/config";
import { useDispatch, useSelector } from "react-redux";
import { showPopup, login } from "../store/authSlice";

const SignUpModal = () => {
  const [countries, setCountries] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState(null);

  const email = useSelector((state) => state.auth.email);

  const [userData, setuserData] = useState({
    name: "India",
    countryId: "91",
    userName: "",
  });

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(showPopup());
  };

  const handleCreateAccount = () => {
    dataService
      .UserRegistration(email, userData.userName, userData.countryId)
      .then((res) => {
        if (res.data.value.isRegistered) {
          dispatch(login());
          dispatch(showPopup());
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleCountrySelect = (countryId, countryName) => {
    setuserData((prev) => ({
      ...prev,
      name: countryName,
      countryId: countryId,
    }));
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    // const text = countries.value.map((country) => country.name);
    // const regexPattern = `\\b(${value}\\w*)\\b`; // \\w* allows for matching any following characters in the word
    // const regex = new RegExp(regexPattern, "gi"); // Create a RegExp object with the pattern
    // const matched = text.filter((country) => regex.test(country));
    setSearch(value.toLowerCase());
  };

  // const defaultCountry = () => {
  //   const defaultCountry = countries.value.filter(
  //     (country) => country.name === "India"
  //   );

  //   return defaultCountry[0].name;
  // };

  useEffect(() => {
    dataService
      .getCountries()
      .then((res) => {
        console.log(setCountries(res.data));
      })
      .catch((e) => console.log(e));
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50 z-50 overflow-visible"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-96 max-w-md p-6 rounded-lg shadow-lg h-auto"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-blue-800 mb-2">
          Complete your sign up
        </h2>

        {/* Email Section */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col">
            <p className="opacity-50">Email</p>
            <span className="text-pink-600 text-lg font-medium">
              {email || "mdtjdanish@gmail.com"}{" "}
            </span>
          </div>
          <img className="h-10" src={`${conf.assets}Green_Tick.png`} alt="" />
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username*"
              className="w-full border rounded-lg px-2 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setuserData((prev) => ({
                  ...prev, // Spread the previous state values
                  userName: e.target.value, // Update the userName property
                }))
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              This name will be used on Predictor game Max 25 & Min 3 Characters
            </p>
          </div>

          {/* Country */}
          <div className="relative">
            <button
              className="w-full border rounded-lg px-2 py-2 text-gray-700 text-start"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userData.name}
            </button>
            {dropdownOpen && (
              <div className="w-full flex justify-center">
                <input
                  onChange={(e) => handleSearch(e)}
                  className="px-2 py-2 bg-pink-100 rounded-xl cursor-pointer w-[90%]"
                  type="text"
                  name=""
                  id=""
                  placeholder="search"
                />
                <ul className="absolute top-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto w-full z-50">
                  {/* {search
                    ? search.map((countryName) => (
                        <li
                          className="px-2 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => handleCountrySelect(countryName)}
                        >
                          {countryName}
                        </li>
                      ))
                    : countries &&
                      countries.value.map((country) => (
                        <li
                          key={country.id}
                          className="px-2 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => handleCountrySelect(country.name)}
                        >
                          {country.name}
                        </li>
                      ))} */}
                  {(countries?.value || [])
                    .filter((country) =>
                      search
                        ? country.name.toLowerCase().includes(search)
                        : true
                    )
                    .map((country) => (
                      <li
                        key={country.id}
                        className="px-2 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() =>
                          handleCountrySelect(country.id, country.name)
                        }
                      >
                        {country.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Create Account Button */}
        <button
          onClick={handleCreateAccount}
          className="w-full mt-4 bg-pink-500 text-white rounded-lg py-2 text-center hover:bg-pink-600"
        >
          Create Account
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default SignUpModal;
