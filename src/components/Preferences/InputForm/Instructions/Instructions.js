import React from "react";
import * as classes from "./Instructions.module.css";
import Button from "../../../../UI/Button/Button";

const Instructions = (props) => {
  const instructions = [
    "You have 30 seconds for each question",
    "Once the timer runs out, you will be moved to the next question and will score zero point for that question",
    "Every correct answer gains you 1 point",
    "Every incorrect answer ( ... 'Kokowa...🙃' ) gains you zero point",
    "You cannot pause the game, so ensure you have time to the quiz",
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
