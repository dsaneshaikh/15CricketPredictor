import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import dataService from "../../services/config";
import { useSelector, useDispatch } from "react-redux";
import { feedShowPopup } from "../../store/feedSlice";
import { predictionDispatch } from "../../store/predictionSlice";

const TeamWin = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamsImages, setTeamsImages] = useState(null);
  const [savePrediction, setSavePrediction] = useState(false);

  const dispatch = useDispatch();

  const matchId = useSelector((state) => state.feed.popupMatchId);
  const selectedTeamId = useSelector((state) =>
    state.prediction.userPredictions.find(
      (prediction) => prediction.matchId === matchId
    )
  )?.questions[0]?.optionId;

  const { teamAName, teamBName, teamAId, teamBId } = useSelector(
    (state) =>
      state.feed.feedData.find((match) => match.matchId === matchId) || {}
  );

  useEffect(() => {
    setSelectedTeam(selectedTeamId);
  }, [selectedTeamId]);

  useEffect(() => {
    const fetchTeamImages = async () => {
      const teams = dataService.getTeamImage(teamAId, teamBId);
      setTeamsImages(teams);
    };
    fetchTeamImages();
  }, [teamAId, teamBId]);

  useEffect(() => {
    if (savePrediction && selectedTeam !== null) {
      dataService
        .savePrediction(matchId, "1", selectedTeam)
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
  }, [savePrediction, selectedTeam, matchId, dispatch]);

  const handleSelection = (team) => {
    setSelectedTeam((prevSelected) => (prevSelected === team ? null : team));
    setSavePrediction(true);
  };

  const closePopup = () => {
    dispatch(feedShowPopup(false));
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="container relative flex h-80 w-[30rem] flex-col rounded-lg border-2 border-transparent bg-white shadow-lg"
      >
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
            <div className="first-team flex flex-col items-center">
              <img className="size-24" src={teamsImages?.[0]} alt="Team 1" />
              <p className="text-center pb-5 font-semibold">{teamAName}</p>
              <div
                className={`h-[26px] w-[26px] rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                  selectedTeam === "1" ? "bg-green-600" : "bg-white"
                }`}
                onClick={() => handleSelection("1")}
              >
                {selectedTeam === "1" && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </div>
            </div>
            <p className="text-3xl text-[#00EEFF]">VS</p>
            <div className="second-team flex flex-col items-center">
              <img className="size-24" src={teamsImages?.[1]} alt="Team 2" />
              <p className="text-center pb-5 font-semibold">{teamBName}</p>
              <div
                className={`h-[26px] w-[26px] rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                  selectedTeam === "2" ? "bg-green-600" : "bg-white"
                }`}
                onClick={() => handleSelection("2")}
              >
                {selectedTeam === "2" && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default TeamWin;
