import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  const btnClasses = [classes.Button];

  if (props.btnType === "isSecondary") {
    btnClasses.push(classes.Secondary);
  } else if (props.btnType === "isPrimary") {
    btnClasses.push(classes.Primary);
  } else if (props.btnType === "inline") {
    btnClasses.push(classes.Inline);
  } else {
    btnClasses.push(classes.White);
  }

  return (
    <button className={btnClasses.join(" ")} onClick={props.clicked ? props.clicked : null} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default button;
