import React, { useState, useEffect } from "react";
import dataService from "../services/config";

const Tabs = ({
  activeTab,
  setActiveTab,
  teamAId,
  teamBId,
  teamAName,
  teamBName,
}) => {
  const [teamsImage, setTeamsImage] = useState(null);

  function TeamsImage(teamA, teamB) {
    const teams = dataService.getTeamImage(teamA, teamB);
    setTeamsImage(teams);
  }

  useEffect(() => {
    TeamsImage(teamAId, teamBId);
  }, []);

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden items-center">
        <button
          onClick={() => setActiveTab(teamAId)}
          className={`flex items-center px-6 py-2 font-medium ${
            activeTab === teamAId
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          <img
            src={teamsImage && teamsImage[0]}
            alt="Shabab Al Ahli Logo"
            className="w-5 h-5 mr-2"
          />
          {teamAName}
        </button>
        <button
          onClick={() => setActiveTab(teamBId)}
          className={`flex items-center px-6 py-2 font-medium ${
            activeTab === teamBId
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          <img
            src={teamsImage && teamsImage[1]}
            alt="Al Jazira Logo"
            className="w-5 h-5 mr-2"
          />
          {teamBName}
        </button>
      </div>
    </div>
  );
};

export default Tabs;
