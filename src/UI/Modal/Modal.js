import React from "react";
import * as classes from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = (props) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.Content}>
        <p>{props.message}</p>
        <div className={classes.BtnContainer}>
          {props.fallbackHandler ? (
            <Button btnType="isSecondary" clicked={props.fallbackHandler}>
              {props.fallbackLabel}
            </Button>
          ) : null}
          <Button btnType="isPrimary" clicked={props.modalCTA}>
            {props.btnLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
