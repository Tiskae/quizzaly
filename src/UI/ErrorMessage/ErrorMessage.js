import React from "react";
import classes from "./ErrorMessage.module.css";

const errorMessage = (props) => {
  return <p className={classes.ErrorMessage}>{props.message}</p>;
};

export default errorMessage;
