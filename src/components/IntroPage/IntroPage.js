import React from "react";
import { withRouter } from "react-router-dom";

import * as classes from "./IntroPage.module.css";
import Button from "../../UI/Button/Button";

const IntroPage = (props) => {
  const callToAction = () => {
    props.history.push("preferences");
  };

  return (
    <div className={classes.IntroPage}>
      <div className={classes.PageImage}></div>
      <div className={classes.PageTextSide}>
        <div className={classes.PageTextBox}>
          <h2>Plethora of topics</h2>
          <p>
            Choose from a vast variety of topics ranging from Sports, Technology,
            Anime and Manga, Comics, Movies and a lot more. Cut your coat
            according to your size by choosing your desired difficulty level,
            type of options and number of questions.
          </p>
          <Button btnType="isPrimary" clicked={callToAction}>
            Let's go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(IntroPage);
