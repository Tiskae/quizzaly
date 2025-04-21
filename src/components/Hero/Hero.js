import { useNavigate } from "react-router-dom";
import classes from "./Hero.module.css";
import Button from "../../UI/Button/Button";

const Hero = (props) => {
  const navigate = useNavigate();

  const callToAction = () => {
    navigate("/intro");
  };

  return (
    <div className={classes.Hero}>
      <div className={classes.HeroTextBox}>
        <h1>Welcome to Quizzaly</h1>
        <p>
          Quizzaly is a fully-flegded quiz app designed and coded with a great user experience in mind, close attention
          to details, resplendent color choices and efficient application logic.
        </p>
        <Button btnType="isPrimary" clicked={callToAction}>
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
