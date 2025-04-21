import React, { useContext } from "react";
import AppContext from "../../Contexts/AppContext";
import classes from "./Results.module.css";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";

const Results = (props) => {
  const context = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className={classes.Results}>
      <div className={classes.Doodle}>
        <div className={classes.Doodle1}></div>
        <div className={classes.Doodle2}></div>
        <div className={classes.Doodle3}></div>
      </div>
      <div className={classes.Content}>
        <h3>Congratulations, you have come to the end of the quiz</h3>
        <p className={classes.Result}>
          You got{" "}
          <span>
            {context.finalScore} of {context.noOfQuestions.value}
          </span>{" "}
          questions right and your score is{" "}
          <span>{(context.finalScore / context.noOfQuestions.value).toFixed(2) * 100}%</span>
        </p>
        <div className={classes.BtnContainer}>
          <Button btnType="isPrimary" clicked={() => navigate("/preferences")}>
            Play again
          </Button>
          <Button btnType="isSecondary" clicked={() => navigate("/leaderboard")}>
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
