import React from "react";
import classes from "./QuickInfo.module.css";

const QuickInfo = (props) => {
  return (
    <div className={classes.QuickInfo}>
      <p>{props.message}</p>
    </div>
  );
};

export default QuickInfo;
