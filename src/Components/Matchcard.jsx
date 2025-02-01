import React, { useState, useEffect } from "react";
import TeamWin from "./Popups/TeamWin";
import dataService from "../services/config";
import Players from "./Popups/Players";
import { useSelector, useDispatch } from "react-redux";
import { feedShowPopup } from "../store/feedSlice";
import LiveIndicator from "./LiveIndicator";
import LoginPopup from "./Popups/LoginPopup";

function Matchcard({ matchId }) {
  const props = useSelector((state) =>
    state.feed.feedData.find((match) => match.matchId === matchId)
  );

  const [matchStatus, setMatchStatus] = useState(props.matchStatus || 1);
  const [day, setDay] = useState(null);
  const [teamsImage, setTeamsImage] = useState(null);
  const [LoginPopupStatus, setLoginPopupStatus] = useState(false);

  const authStatus = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  const feedShowPopupStatus = useSelector(
    (state) => state.feed.feedShowPopup.popup
  );

  const feedShowPopupHandler = (popup, matchId) => {
    if (authStatus) {
      dispatch(feedShowPopup({ popup, matchId }));
    } else {
      setLoginPopupStatus(true);
    }
  };

  function dateConvertToDay(date) {
    const inidate = date.split("-").reverse().join("-");
    const dateString = new Date(inidate);
    const dayName = dateString.toLocaleDateString("en-US", { weekday: "long" });
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
    <div
      className={`${
        matchStatus !== 1 ? "pointer-events-none " : ""
      } relative flex flex-col w-full max-w-xs p-6 rounded-xl bg-[#0a0b60] shadow-lg`}
    >
      {matchStatus === 2 && (
        <div className="flex items-center absolute top-0 left-0 p-2">
          <LiveIndicator />
        </div>
      )}
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
      <div className={`mt-4 text-sm ${matchStatus !== 1 ? "opacity-50" : ""}`}>
        <div
          onClick={() => feedShowPopupHandler("1", matchId)}
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
          onClick={() => feedShowPopupHandler("2", matchId)}
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
          onClick={() => feedShowPopupHandler("3", matchId)}
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
        if (feedShowPopupStatus === "1") {
          return <TeamWin matchIdno={matchId} />;
        }
        if (feedShowPopupStatus) {
          return <Players matchId={matchId} questionId={feedShowPopupStatus} />;
        }
        if (LoginPopupStatus) {
          return <LoginPopup setLoginPopupStatus={setLoginPopupStatus} />;
        }
        return null;
      })()}
    </div>
  );
}

export default Matchcard;
