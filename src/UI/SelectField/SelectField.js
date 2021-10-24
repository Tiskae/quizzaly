import React from "react";
import * as classes from "./SelectField.module.css";

const SelectField = (props) => {
  const options = props.options.map((opt, i) => <option key={i}>{opt}</option>);

  return (
    <select
      className={classes.SelectField}
      onChange={props.changed}
      value={props.value}
    >
      <option>{props.defaultOpt}</option>
      {options}
    </select>
  );
};

export default SelectField;
