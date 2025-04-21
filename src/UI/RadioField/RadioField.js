import React from "react";
import classes from "./RadioField.module.css";

const radioField = (props) => {
  const inputClassesArr = [classes.RadioInput];

  if (props.radioType === "isPrimary") {
    inputClassesArr.push(classes.Primary);
  } else if (props.radioType === "isSecondary") {
    inputClassesArr.push(classes.Secondary);
  }

  const inputClasses = inputClassesArr.join(" ");

  return (
    <div className={classes.RadioField}>
      <input
        id={props.id}
        name={props.name}
        type="radio"
        // React nerfed camel casing😶
        iscorrect={props.isCorrect.toString()}
        className={inputClasses}
        onChange={props.changed}
      />
      <label className={classes.RadioLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default radioField;
