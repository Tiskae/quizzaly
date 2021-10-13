import React, { useState, useEffect } from "react";
import * as classes from "./Timer.module.css";
import * as helper from "../../Helpers";

const Timer = (props) => {
  const [time, setTime] = useState(15);
  let timeInterval;

  //   😭😭😭😭😭😭😭😭😭😭😭
  //   😭😭😭😭😭😭😭😭😭😭😭
  //   😭😭😭😭😭😭😭😭😭😭😭

  useEffect(() => {
    setTime(5);
    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
      setTime((time) => {
        //   if (time === 0) props.timeUp();
        if (time > 0) {
          return time - 1;
        } else if (time === 0) {
          console.log("Moved!!!");
          props.timeUp();
          return 5;
        }
      });

      if (props.readyForSubmission) clearInterval(timeInterval);
      return () => {
        clearInterval(timeInterval);
      };
      //   console.log(time);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className={classes.Timer}>
      <p className={time <= 10 ? classes.Red : null}>
        {time > 0
          ? `${Math.floor(time / 60)}:${`${time % 60}`.padStart(2, 0)}`
          : "Time's up!"}
      </p>
    </div>
  );
};

export default Timer;
