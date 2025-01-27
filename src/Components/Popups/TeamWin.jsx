import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import dataService from "../../services/config";

const TeamWin = ({ showPopup, teamA, teamB, teamAId, teamBId }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamsImages, setTeamsImages] = useState(null);

  const handleSelection = (team) => {
    // Toggle selection: Uncheck if already selected, otherwise select
    setSelectedTeam((prevSelected) => (prevSelected === team ? null : team));
  };

  const closePopup = () => {
    showPopup(false);
  };

  function TeamsImage(teamA, teamB) {
    const teams = dataService.getTeamImage(teamA, teamB);
    setTeamsImages(teams);
  }
  useEffect(() => {
    TeamsImage(teamAId, teamBId);
  }, []);

  const popupContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="container relative flex h-80 w-[30rem] flex-col rounded-lg border-2 border-transparent bg-white shadow-lg"
      >
        {/* Close Button */}
        <button
          className="absolute top-1 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          onClick={closePopup}
        >
          ×
        </button>
        <div className="questions flex flex-col items-center">
          <p className="question mt-3 text-black font-semibold text-2xl">
            Which team will win?
          </p>
          <p className="guide text-[#5C707A] text-lg">
            Guess right to score +2 pts
          </p>
          <div className="mt-12 flex items-center gap-12">
            {/* First Team */}
            <div className="first-team flex flex-col items-center">
              <div>
                <img
                  className="size-24"
                  src={teamsImages && teamsImages[0]}
                  alt="Team 1"
                />
                <p className="text-center pb-5 font-semibold">{teamA}</p>
              </div>
              <div className="relative">
                <div
                  className={`h-[26px] w-[26px] rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                    selectedTeam === "team1" ? "bg-green-600" : "bg-white"
                  }`}
                  onClick={() => handleSelection("team1")}
                >
                  {selectedTeam === "team1" && (
                    <span className="text-white font-bold text-lg">✓</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-3xl text-[#00EEFF]">VS</p>
            {/* Second Team */}
            <div className="second-team flex flex-col items-center">
              <div>
                <img
                  className="size-24"
                  src={teamsImages && teamsImages[1]}
                  alt="Team 2"
                />
                <p className="text-center pb-5 font-semibold">{teamB}</p>
              </div>
              <div className="relative">
                <div
                  className={`h-[26px] w-[26px] rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                    selectedTeam === "team2" ? "bg-green-600" : "bg-white"
                  }`}
                  onClick={() => handleSelection("team2")}
                >
                  {selectedTeam === "team2" && (
                    <span className="text-white font-bold text-lg">✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    popupContent,
    document.getElementById("portal-root")
  );
};

export default TeamWin;
