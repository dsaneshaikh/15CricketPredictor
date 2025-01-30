import React, { useState, useEffect, useRef } from "react";
import Matchcard from "../Components/Matchcard";
import dataService from "../services/config";
import Tabs from "../Components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { feedDispatch } from "../store/feedSlice";

function Home() {
  const [feed, setFeed] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const tabContainerRef = useRef(null);
  const tabRefs = useRef([]);

  console.log("cookie", document.cookie);

  const dispatch = useDispatch();

  useEffect(() => {
    dataService
      .getFeed()
      .then((response) => {
        setFeed(response);
        dispatch(feedDispatch(response.data.value));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition();
    };

    window.addEventListener("resize", handleResize);
    updateIndicatorPosition();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  const updateIndicatorPosition = () => {
    if (tabContainerRef.current && tabRefs.current[activeTab - 1]) {
      const tab = tabRefs.current[activeTab - 1];
      const tabContainerRect = tabContainerRef.current.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const leftOffset = tabRect.left - tabContainerRect.left;

      const slidingIndicator = document.getElementById("sliding-indicator");
      if (slidingIndicator) {
        slidingIndicator.style.transform = `translateX(${leftOffset}px)`;
        slidingIndicator.style.width = `${tabRect.width}px`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B0F65] via-[#0B1490] to-[#0C17AD] text-white">
      {/* Tabs Section */}
      <div
        ref={tabContainerRef}
        className="relative flex justify-center items-center gap-8 pt-5 border-b pb-3 w-[73%] mx-auto"
      >
        {/* Sliding Indicator */}
        <div
          id="sliding-indicator"
          className="absolute left-0 top-[13px] border-b-[3px] border-[#00EEFF] h-10 z-20 transition-transform duration-300 animate-pulse-glow"
          style={{
            borderRadius: "2px", // Optional for rounded corners
          }}
        ></div>

        {/* Tab Buttons */}
        {["Current Matches", "Completed Matches"].map((label, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setActiveTab(index + 1)}
            className={`z-10 text-sm font-semibold transition-colors duration-300 ${
              activeTab === index + 1
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Matches Section */}
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-screen-xl mx-auto">
        {activeTab === 1 &&
          feed?.data?.value
            ?.filter((match) => match.matchStatus !== 3)
            .map((match) => (
              <Matchcard key={match.matchId} matchId={match.matchId} />
            ))}

        {activeTab === 2 &&
          feed?.data?.value
            .filter((match) => match.matchStatus === 3)
            .map((match) => (
              <Matchcard key={match.matchId} matchId={match.matchId} />
            ))}
      </div>
    </div>
  );
}

export default Home;
