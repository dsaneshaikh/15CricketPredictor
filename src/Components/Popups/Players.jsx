import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Tabs from "../Tabs";
import conf from "../../conf/conf";
import { useDispatch, useSelector } from "react-redux";
import { feedShowPopup } from "../../store/feedSlice";
import { use } from "react";
import dataService from "../../services/config";
import { predictionDispatch } from "../../store/predictionSlice";
function Players({ questionId }) {
  const matchId = useSelector((state) => state.feed.popupMatchId);
  const [savePrediction, setSavePrediction] = useState(false);

  const { teamAName, teamBName, teamAId, teamBId, questions } = useSelector(
    (state) =>
      state.feed.feedData.filter((match) => match.matchId === matchId)[0]
  );
  const [activeTab, setActiveTab] = useState(teamAId);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const question = questions.filter(
    (question) => question.questionId === parseInt(questionId)
  );

  const dispatch = useDispatch();

  // Close popup handler
  const closePopup = () => {
    dispatch(feedShowPopup(false));
  };

  // Handle player selection
  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer((prev) => (prev === playerId ? null : playerId));
    setSavePrediction(true);
  };

  const selectedPlayerId = useSelector(
    (state) =>
      state.prediction.userPredictions
        .find((prediction) => prediction.matchId === matchId)
        ?.questions.find(
          (question) => question.questionId === parseInt(questionId)
        )?.optionId
  );

  useEffect(() => {
    setSelectedPlayer(selectedPlayerId);

    console.log(selectedPlayerId, questionId);
  }, [selectedPlayerId]);

  // Save prediction

  useEffect(() => {
    if (savePrediction && selectedPlayer !== null) {
      dataService
        .savePrediction(matchId, questionId, selectedPlayer)
        .then((response) => {
          setSavePrediction(false);
          if (response) {
            dataService.getPrediction().then((response) => {
              if (response) {
                dispatch(predictionDispatch(response.data.value));
              }
            });
          }
        });
    }
  }, [savePrediction, selectedPlayer]);

  // Popup content JSX
  const popupContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-[32rem] w-[28rem] flex-col border-transparent rounded-xl bg-white shadow-lg"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold z-50"
          onClick={closePopup}
        >
          ×
        </button>
        <div className="ml-10 mr-10">
          {/* Question Section */}
          <div className="question flex flex-col items-center">
            <p className="mt-3 text-black font-semibold text-2xl">
              {question[0].questionDesc}
            </p>
            <p className="text-[#5C707A] text-lg">
              Guess right to score +{question[0].questionPoints} pts
            </p>
          </div>

          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            teamAId={teamAId}
            teamBId={teamBId}
            teamAName={teamAName}
            teamBName={teamBName}
          />

          {/* Players List */}
          <div className="players mt-3 h-[22rem] overflow-y-scroll custom-scrollbar">
            <ul>
              {question[0].options
                .filter((option) => option.teamId === activeTab)
                .map((option) => (
                  <li
                    key={option.optionId}
                    onClick={() => handlePlayerSelect(option.optionId)}
                    className={`mt-5 flex h-12 items-center rounded-md border cursor-pointer ${
                      selectedPlayer === option.optionId
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-[#EBEDF4]"
                    }`}
                  >
                    <img
                      className="ml-3 h-10"
                      src={`${conf.assets}avatar_dummy.png`}
                      alt="Avatar"
                    />
                    <p className="ml-5 flex-1">{option.optionDesc}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Portal to render the popup
  return ReactDOM.createPortal(
    popupContent,
    document.getElementById("portal-root")
  );
}

export default Players;
