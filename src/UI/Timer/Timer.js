import React, { useState } from "react";
import classes from "./Timer.module.css";
import * as helper from "../../Helpers";
import Countdown, { zeroPad } from "react-countdown";

const Timer = (props) => {
  const [key, setKey] = useState(new Date());

  //   Spent a lot of time before I could fix this component
  //   If you're reading this, welcome to the code that works

  return (
    <div className={classes.Timer}>
      {!props.readyForSubmission ? (
        <Countdown
          date={Date.now() + helper.TIME_FOR_A_QUESTION * 1000}
          onTick={() => {}}
          onComplete={(timeDelta) => {
            if (props.currentQuestion < props.totalNoOfQuestionsRetrieved) {
              setKey(new Date());
            }
            !props.readyForSubmission && props.timeUp();
          }}
          key={key}
          renderer={({ _, minutes, seconds }) => (
            <p className={seconds <= 10 ? classes.Red : null}>
              {seconds > 0 ? `${zeroPad(minutes)}:${zeroPad(seconds)}` : "Time's up!"}
            </p>
          )}
        />
      ) : null}
    </div>
  );
};

export default React.memo(Timer);
