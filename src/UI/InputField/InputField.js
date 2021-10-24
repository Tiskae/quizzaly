import React from "react";
import * as classes from "./InputField.module.css";

const inputField = (props) => {
  return (
    <div className={classes.InputField}>
      <label htmlFor={props.id} className={classes.Label}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.inputType}
        className={classes.Input}
        onChange={props.changed}
        value={props.value}
        maxLength="15"
      />
    </div>
  );
};

export default inputField;
