import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as classes from "./Leaderboard.module.css";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import AppContext from "../../Contexts/AppContext";
import * as helper from "../../Helpers";
import Modal from "../../UI/Modal/Modal";
import QuickInfo from "../../UI/QuickInfo/QuickInfo";
import ShareLeaderboard from "../ShareLeaderboard/ShareLeaderboard";

const Leaderboard = (props) => {
  const [state, setState] = useState({
    results: null,
    loaded: false,
    scores: [],
    userPosition: null,
    isUserOnLeaderboard: false,
    errorExists: false,
    showShareComponent: false,
    shareSuccessMessage: "",
  });

  const context = useContext(AppContext);

  useEffect(() => {
    fetchLeaderboardFromCloud();
  }, []);

  const fetchLeaderboardFromCloud = () => {
    axios
      .get(`${helper.DATABASE_URL}/results.json`)
      .then((res) => {
        const sortedResultsArr = Object.values(res.data).sort((prev, next) =>
          prev.percentage_correct < next.percentage_correct ? 1 : -1
        );
        const slicedResultsArr = [...sortedResultsArr].slice(
          0,
          helper.MAX_LEADERBOARD_NUMBER
        );

        const pulledScores = sortedResultsArr.map(
          (el) => el.percentage_correct
        );

        let userPosition = pulledScores.length;
        pulledScores.reverse().forEach((el, i, arr) => {
          if (context.finalScore > el) {
            userPosition = arr.length - i;
          }
        });
        const isUserOnLeaderboard = slicedResultsArr
          .map((el) => el.user_id)
          .includes(context.userId);
        console.log(slicedResultsArr);
        // console.log(scores);

        setState({
          ...state,
          results: [...slicedResultsArr],
          loaded: true,
          scores: pulledScores,
          userPosition: userPosition,
          isUserOnLeaderboard: isUserOnLeaderboard,
        });
      })
      .catch((err) => {
        setState({ ...state, errorExists: true });
        console.error("Error", err);
      });
  };

  const modalCTA = () => {
    setState({ ...state, errorExists: false });
    fetchLeaderboardFromCloud();
  };

  const modalFallback = () => props.history.push("/preferences");

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
                  <td>
                    {el.difficulty[0].toUpperCase() + el.difficulty.slice(1)}
                  </td>
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
                    ? context.difficulty.displayName[0].toUpperCase() +
                      context.difficulty.displayName.slice(1)
                    : ""}
                </td>
                <td>
                  {(context.finalScore / context.noOfQuestions.value).toFixed(
                    2
                  ) * 100}
                  %
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className={classes.BtnContainer}>
          <Button
            disabled={state.shareSuccessMessage}
            btnType="isSecondary"
            clicked={() => shareBtnHandler()}
          >
            Share results
          </Button>
          <Button
            btnType="isPrimary"
            clicked={() => props.history.push("/preferences")}
          >
            Play {context.username ? "again!" : "now!"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className={classes.Leaderboard}>
      {context.username ? (
        <QuickInfo
          message={
            state.isUserOnLeaderboard
              ? "Congratulations, you claimed a spot in the leaderboard"
              : "You're not on the leaderboard"
          }
        />
      ) : null}
      {state.shareSuccessMessage ? (
        <QuickInfo
          message={
            "Successfully shared to " +
            state.shareSuccessMessage +
            ". Thank you❤️"
          }
        />
      ) : null}
      <div className={classes.Content}>
        <h3>Leaderboard</h3>
        {content}
      </div>
      {state.errorExists ? (
        <Modal
          message="Couldn't fetch leaderboard data"
          btnLabel="Retry"
          modalCTA={modalCTA}
          fallbackLabel="Cancel"
          fallbackHandler={modalFallback}
        />
      ) : null}
      {state.showShareComponent ? (
        <ShareLeaderboard close={shareBtnHandler} />
      ) : null}
    </div>
  );
};

export default withRouter(Leaderboard);
