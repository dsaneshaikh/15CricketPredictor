import React from "react";

function LiveIndicator() {
  return (
    <>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <span className="text-red-500 font-medium text-base ml-2">Live</span>
    </>
  );
}

export default LiveIndicator;
