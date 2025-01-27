import React, { useState, useEffect } from "react";
import TeamWin from "./Popups/TeamWin";
import conf from "../conf/conf";
import dataService from "../services/config";
import Players from "./Popups/Players";
import { useSelector } from "react-redux";

function Matchcard(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [day, setDay] = useState(null);
  const [teamsImage, setTeamsImage] = useState(null);

  const matchRedux = useSelector((state) => state.feed);

  console.log(matchRedux);

  function dateConvertToDay(date) {
    const inidate = date.split("-").reverse().join("-");
    const dateString = new Date(inidate); // Example date
    const dayName = dateString.toLocaleDateString("en-US", { weekday: "long" }); // "Monday"
    setDay(dayName);
  }

  function TeamsImage(teamA, teamB) {
    const teams = dataService.getTeamImage(teamA, teamB);
    setTeamsImage(teams);
  }
  useEffect(() => {
    dateConvertToDay(props.matchDate);

    TeamsImage(props.teamAId, props.teamBId);
  }, []);

  return (
    <div className="relative flex flex-col w-full max-w-xs p-6 rounded-xl bg-[#0a0b60] shadow-lg">
      {/* Team Info */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-400">
          {day} , {props.matchTime}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <img
            className="h-14 w-14"
            src={teamsImage && teamsImage[0]}
            alt="Team A"
          />
          <p className="mt-2 font-bold">{props.teamAName}</p>
        </div>
        <p className="text-2xl text-[#00EEFF]">VS</p>
        <div className="flex flex-col items-center">
          <img
            className="h-14 w-14"
            src={teamsImage && teamsImage[1]}
            alt="Team B"
          />
          <p className="mt-2 font-bold">{props.teamBName}</p>
        </div>
      </div>

      {/* Prediction Section */}
      <div className="mt-4 text-sm">
        <div
          onClick={() => setShowPopup("1")}
          className="cursor-pointer flex justify-between border-t border-gray-600 border-opacity-50 pt-2 mt-2"
        >
          <p className="font-semibold hover:opacity-85 transition">
            First team to score
          </p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14m-7 7V5"></path>
          </svg>
        </div>
        <div
          onClick={() => setShowPopup("2")}
          className="cursor-pointer flex justify-between border-t border-gray-600 border-opacity-50 pt-2 mt-2"
        >
          <p className="font-semibold hover:opacity-85 transition">
            Player to score most runs?
          </p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14m-7 7V5"></path>
          </svg>
        </div>
        <div
          onClick={() => setShowPopup("3")}
          className="cursor-pointer flex justify-between border-t border-gray-600 border-opacity-50 pt-2 mt-2"
        >
          <p className="font-semibold hover:opacity-85 transition">
            Player to take most wickets
          </p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14m-7 7V5"></path>
          </svg>
        </div>
      </div>
      {/* Conditional Rendering */}
      {(() => {
        if (showPopup === "1") {
          return (
            <TeamWin
              showPopup={setShowPopup}
              teamA={props.teamAName}
              teamB={props.teamBName}
              teamAId={props.teamAId}
              teamBId={props.teamBId}
            />
          );
        }
        if (showPopup) {
          return (
            <Players
              showPopup={setShowPopup}
              question={props.questions.filter(
                (question) => question.questionId == showPopup
              )}
              teamAId={props.teamAId}
              teamBId={props.teamBId}
              teamAName={props.teamAName}
              teamBName={props.teamBName}
            />
          );
        }
        return null;
      })()}
    </div>
  );
}

export default Matchcard;
