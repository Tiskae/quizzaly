import React from "react";
import * as classes from "./Timer.module.css";

const Timer = (props) => {
    // const [time, setTime] = useState(props.time);

    // const currNumberProps = props.currentNumber;

    // useEffect(() => {
    //     const timeInterval = setInterval(() => {
    //         setTime((time) => {
    //             if (time > 0) {
    //                 return time - 1;
    //             } else {
    //                 props.timeUp();
    //                 clearInterval(timeInterval);
    //                 return props.time;
    //             }
    //         });
    //         console.log(time);
    //     }, 1000);

    //     return () => clearInterval(timeInterval);
    // }, [currNumberProps]);

    // return (
    //     <div className={classes.Timer}>
    //         {time > 0
    //             ? `${Math.floor(time / 60)}:${`${time % 60}`.padStart(2, 0)}`
    //             : "Time's up!"}
    //         {/* {props.time} */}
    //     </div>
    // );

    return (
        <div className={classes.Timer}>
            {props.time > 0
                ? `${Math.floor(props.time / 60)}:${`${
                      props.time % 60
                  }`.padStart(2, 0)}`
                : "Time's up!"}
            {/* {props.time} */}
        </div>
    );
};

export default Timer;
