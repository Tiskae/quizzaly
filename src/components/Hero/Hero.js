import { withRouter } from "react-router-dom";
import * as classes from "./Hero.module.css";
import Button from "../../UI/Button/Button";

const Hero = (props) => {
  const callToAction = () => {
    props.history.push("/intro");
  };

  return (
    <div className={classes.Hero}>
      <div className={classes.HeroTextBox}>
        <h1>Welcome to Tiz-Quiz</h1>
        <p>
          Tiz Quiz is an automatic quiz based on JavaScript. It is fast,
          efficient and gives you the best of quiz experience in a clean and
          user-friendly environment
        </p>
        <Button btnType="isPrimary" clicked={callToAction}>
          Get started
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Hero);
