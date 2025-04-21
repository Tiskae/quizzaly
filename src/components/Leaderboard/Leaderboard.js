import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import classes from "./Leaderboard.module.css";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import AppContext from "../../Contexts/AppContext";
import * as helper from "../../Helpers";
import Modal from "../../UI/Modal/Modal";
import QuickInfo from "../../UI/QuickInfo/QuickInfo";
import ShareQuiz from "../ShareQuiz/ShareQuiz";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [state, setState] = useState({
    results: null,
    loaded: false,
    scores: [],
    userPosition: null,
    isUserOnLeaderboard: false,
    errorExists: false,
    fetchLeaderboardErrorMsg: null,
    showShareComponent: false,
    shareSuccessMessage: "",
    totalNumberOfQuiz: null,
  });

  const navigate = useNavigate();

  const context = useContext(AppContext);

  const fetchLeaderboardFromCloud = useCallback(() => {
    axios
      .get(`${helper.DATABASE_URL}/results.json`)
      .then((res) => {
        if (!res.data)
          throw new Error("No one is on the leaderboard yet. A good time to pick your spot and be number 1!");

        const sortedResultsArr = Object.values(res.data).sort((prev, next) =>
          prev.percentage_correct < next.percentage_correct ? 1 : -1
        );

        const totalNumberOfQuiz = sortedResultsArr.length;

        const slicedResultsArr = [...sortedResultsArr].slice(0, helper.MAX_LEADERBOARD_NUMBER);

        const pulledScores = sortedResultsArr.map((el) => el.percentage_correct);

        const isUserOnLeaderboard = slicedResultsArr.map((el) => el.user_id).includes(context.userId);

        let userPosition = null;
        if (!isUserOnLeaderboard && context.username) {
          // const user_percentage = (context.finalScore / context.noOfQuestions.value).toFixed(2) * 100;
          const userPositionInFetchedList = sortedResultsArr.findIndex((el) => el.user_id === context.userId);
          userPosition = userPositionInFetchedList !== -1 ? userPositionInFetchedList : "-";
        }

        setState({
          ...state,
          results: [...slicedResultsArr],
          loaded: true,
          scores: pulledScores,
          userPosition: userPosition,
          isUserOnLeaderboard: isUserOnLeaderboard,
          totalNumberOfQuiz: totalNumberOfQuiz,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          errorExists: true,
          fetchLeaderboardErrorMsg: err.message,
        });
      });
  }, [context.userId, context.username, state]);

  useEffect(() => {
    fetchLeaderboardFromCloud();
  }, [fetchLeaderboardFromCloud]);

  const modalCTA = () => {
    setState({ ...state, errorExists: false });
    fetchLeaderboardFromCloud();
  };

  const modalFallback = () => navigate("/preferences");

  const shareBtnHandler = (appName) => {
    if (appName) {
      setState({
        ...state,
        showShareComponent: !state.showShareComponent,
        shareSuccessMessage: appName,
      });
      setTimeout(
        () =>
          setState({
            ...state,
            showShareComponent: false,
            shareSuccessMessage: "",
          }),
        4000
      );
    } else
      setState({
        ...state,
        showShareComponent: !state.showShareComponent,
        shareSuccessMessage: "",
      });
  };

  let content = <Loader color="primary" />;
  if (state.loaded) {
    content = (
      <>
        <table className={classes.LeaderboardTable}>
          <thead>
            <tr>
              <th>#Rank</th>
              <th>Name</th>
              <th>Track</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {state.results.map((el, i) => {
              let styleClass = null;
              let userName = el.user_name;
              if (i % 2 === 1) styleClass = classes.Dimmed;
              if (el.user_id === context.userId) {
                styleClass = classes.You;
                userName = "You";
              }

              return (
                <tr key={i} className={styleClass}>
                  <td>{i + 1}</td>
                  <td>{userName}</td>
                  <td>{el.quiz_track}</td>
                  <td>{el.difficulty[0].toUpperCase() + el.difficulty.slice(1)}</td>
                  <td>{el.percentage_correct}%</td>
                </tr>
              );
            })}

            {!state.isUserOnLeaderboard && context.username ? (
              <tr className={classes.You}>
                <td>{state.userPosition}</td>
                <td>You</td>
                <td>{context.quizTrack}</td>
                <td>
                  {context.difficulty.displayName
                    ? context.difficulty.displayName[0].toUpperCase() + context.difficulty.displayName.slice(1)
                    : ""}
                </td>
                <td>{(context.finalScore / context.noOfQuestions.value).toFixed(2) * 100}%</td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className={classes.BtnContainer}>
          <Button disabled={state.shareSuccessMessage} btnType="isSecondary" clicked={() => shareBtnHandler()}>
            Share quiz
          </Button>
          <Button btnType="isPrimary" clicked={() => navigate("/preferences")}>
            Play {context.username ? "again!" : "now!"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className={classes.Leaderboard}>
      {context.username && state.loaded ? (
        <QuickInfo
          message={
            state.isUserOnLeaderboard
              ? "Congratulations, you claimed a spot in the leaderboard"
              : "You're not on the leaderboard"
          }
        />
      ) : null}
      {state.shareSuccessMessage ? (
        <QuickInfo message={"Successfully shared to " + state.shareSuccessMessage + ". Thank you❤️"} />
      ) : null}
      <div className={classes.Content}>
        <h3>Leaderboard</h3>
        {state.totalNumberOfQuiz ? (
          <p className={classes.Total}>Total number of quiz played: {state.totalNumberOfQuiz}</p>
        ) : null}
        {content}
      </div>
      {state.errorExists ? (
        <Modal
          message={state.fetchLeaderboardErrorMsg}
          btnLabel="Retry"
          modalCTA={modalCTA}
          fallbackLabel="Cancel"
          fallbackHandler={modalFallback}
        />
      ) : null}
      {state.showShareComponent ? <ShareQuiz close={shareBtnHandler} /> : null}
    </div>
  );
};

export default Leaderboard;
