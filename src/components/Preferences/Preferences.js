import React from "react";
import InputForm from "./InputForm/InputForm";

import * as classes from "./Preferences.module.css";

const Preferences = (props) => {
  return (
    <div className={classes.Preferences}>
      <div className={classes.PageImage}></div>
      <div className={classes.PageTextSide}>
        <InputForm pushData={props.pullData} />
      </div>
    </div>
  );
};

export default Preferences;
