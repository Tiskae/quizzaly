import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  let styleClasses = [classes.Loader];

  if (props.color === "primary") {
    styleClasses.push(classes.Primary);
  } else if (props.color === "secondary") {
    styleClasses.push(classes.Secondary);
  }
  return (
    <div className={classes.Container}>
      <div className={styleClasses.join(" ")}></div>
    </div>
  );
};

export default Loader;
