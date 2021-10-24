import React from "react";
import * as classes from "./Instructions.module.css";
import Button from "../../../../UI/Button/Button";
import * as helper from "../../../../Helpers";

const Instructions = (props) => {
  const instructions = [
    `You have ${helper.TIME_FOR_A_QUESTION} seconds for each question`,
    "Once the timer runs out, you will be moved to the next question and will score zero point for that question",
    "Every correct answer gains you 1 point",
    "Every incorrect answer ( '... kokowa...' ) gains you zero point",
    "You cannot pause the game, so ensure you have at least the estimated time stated below",
    "Do not reload the browser once you've started the quiz, all quiz progress will be lost",
  ];

  return (
    <div className={classes.Instructions}>
      <div className={classes.Content}>
        <Button btnType="inline" clicked={props.close}>
          <span>{"<"}</span>
          go back
        </Button>
        <div>
          <h3>Instructions</h3>
          <ul>
            {instructions.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Your choices</h3>
          <ul>
            <li>Track: {props.track}</li>
            <li>Difficulty: {props.difficulty}</li>
            <li>Mode of options: {props.selectType}</li>
            <li>Number of questions: {props.noOfQuestions}</li>
            <li>
              Estimated quiz time:{" "}
              {(
                (props.noOfQuestions * helper.TIME_FOR_A_QUESTION) /
                60
              ).toFixed(1) + " minutes"}
            </li>
          </ul>
        </div>
        <Button btnType="isSecondary" clicked={props.success}>
          Ready up!
        </Button>
      </div>
    </div>
  );
};

export default Instructions;
