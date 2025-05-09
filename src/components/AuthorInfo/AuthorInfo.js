import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthorInfo.module.css";
import Button from "../../UI/Button/Button";
import ShareLeaderboard from "../ShareQuiz/ShareQuiz";
import QuickInfo from "../../UI/QuickInfo/QuickInfo";

const AuthorInfo = () => {
  const [state, setState] = useState({
    showInfo: false,
    showShareComponent: false,
    shareSuccessMessage: "",
  });

  const navigate = useNavigate();

  const navigateToLeaderboard = () => navigate("/leaderboard");

  const toggleShowInfo = () => {
    setState({
      ...state,
      showInfo: !state.showInfo,
    });
  };

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

  const contentClasses = [classes.Content];
  if (state.showInfo) contentClasses.push(classes.Visible);

  return (
    <div className={classes.AuthorInfo}>
      {state.shareSuccessMessage ? (
        <QuickInfo message={"Successfully shared to " + state.shareSuccessMessage + ". Thank you❤️"} />
      ) : null}
      <p className={classes.ToggleBtn} onClick={toggleShowInfo}>
        {state.showInfo ? "X" : "i"}
      </p>

      <div className={contentClasses.join(" ")}>
        <p>Hey! I'm Ibrahim, a software developer. This app was built with ❤️ from Nigeria. &copy; 2025</p>
        <Button btnType="inline" clicked={() => navigateToLeaderboard()} disabled={state.shareSuccessMessage}>
          View Leaderboard
        </Button>
        <Button btnType="isSecondary" clicked={() => shareBtnHandler()} disabled={state.shareSuccessMessage}>
          Share quiz
        </Button>

        <a href="https://tiskae.netlify.app" target="_blank" rel="noreferrer">
          <Button btnType="isPrimary">contact me</Button>
        </a>
      </div>
      {state.showShareComponent ? <ShareLeaderboard close={shareBtnHandler} /> : null}
    </div>
  );
};

export default AuthorInfo;
