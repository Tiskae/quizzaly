import React from "react";
import classes from "./Question.module.css";

import RadioField from "../../UI/RadioField/RadioField";

const Question = (props) => {
  return (
    <div className={classes.Question}>
      <div className={classes.Wrapper}>
        <h3>{"Question " + props.number}</h3>
        <p>{props.question}</p>
        {props.options[0].map((el, i) => (
          <RadioField
            key={el.value + "" + props.number}
            id={el.value + "" + i}
            name={props.number}
            label={el.value}
            isCorrect={el.isCorrect}
            radioType={props.isSecondary ? "isSecondary" : "isPrimary"}
            changed={props.changed}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
