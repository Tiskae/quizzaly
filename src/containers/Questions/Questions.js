import React, { Component } from "react";
import classes from "./Questions.module.css";

import Button from "../../UI/Button/Button";
import Question from "../../components/Question/Question";

import axios from "axios";
import { parseStringToHTML } from "../../Helpers";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../UI/Modal/Modal";
import Aux from "../../hoc/Auxilliary";
import AppContext from "../../Contexts/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import QuickInfo from "../../UI/QuickInfo/QuickInfo";
import * as helper from "../../Helpers";
import Timer from "../../UI/Timer/Timer";

class Questions extends Component {
  state = {
    questions: [],
    isSecondary: false,
    currentNumber: 1,
    totalNoOfQuestionsRetrieved: 10,
    questionsLoaded: false,
    optionChosen: false,
    isCurrentChosenOptionRight: false,
    fetchErrorExists: false,
    fetchErrorMessage: null,
    sendErrorExists: false,
    sendErrorMessage: null,
    readyForSubmission: false,
    quizCompleted: false,
    sendingResult: false,
    score: 0,
  };

  static contextType = AppContext;

  handleWindowClose = (ev) => {
    ev.preventDefault();
    return (ev.returnValue = "All your quiz progress will be lost");
  };

  navigate = () => {};

  componentDidMount() {
    const URLToFetch = this.context.URLToFetch;
    // const URLToFetch = "https://opentdb.com/api.php?amount=5";

    axios
      .get(URLToFetch)
      .then((res) => {
        if (res.data.response_code === 0) {
          this.setState({
            questions: res.data.results,
            questionsLoaded: true,
            totalNoOfQuestionsRetrieved: res.data.results.length,
            fetchErrorExists: false,
            fetchErrorMessage: null,
          });
        } else if (res.data.response_code === 1) {
          this.setState({
            questionsLoaded: false,
            fetchErrorExists: true,
            fetchErrorMessage:
              "Ooops! There are not enough questions for your preference, please choose another set of preferences, " +
              "we suggest changing the difficulty and select type to 'Any' or lower the amount of 'question'",
          });
        } else {
          this.setState({
            questionsLoaded: false,
            fetchErrorExists: true,
            fetchErrorMessage: "Something else went wrong...",
          });
        }
      })
      .catch((err) => {
        this.setState({
          questionsLoaded: false,
          fetchErrorExists: true,
          fetchErrorMessage: "Check your internet connection and try again!",
        });
      });

    window.addEventListener("beforeunload", this.handleWindowClose);
  }

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.handleWindowClose);
    this.pushDataToParentEl();
  };

  moveToNextQuestion = () => {
    this.setState((prevState) => {
      return {
        isSecondary: !prevState.isSecondary,
        currentNumber: prevState.currentNumber + 1,
        score: prevState.isCurrentChosenOptionRight ? prevState.score + 1 : prevState.score,
        isCurrentChosenOptionRight: false,
        optionChosen: false,
      };
    });
  };

  fetchErrorModalCTA = () => {
    this.props.navigate("/preferences");
  };

  sendResultErrorModalCTA = () => {
    this.setState({ sendErrorExists: false, sendErrorMessage: null });
    this.sendResultToDatabase();
  };

  sendResultfallbackHandler = () => {
    this.props.navigate("/preferences");
  };

  optionChosenHandler = (event) => {
    const isCorrect = event.target.attributes.iscorrect.value === "true" ? true : false;
    this.setState({
      isCurrentChosenOptionRight: isCorrect,
      optionChosen: true,
    });
  };

  pushDataToParentEl = () => {
    const isLastOptionCorrect = this.state.isCurrentChosenOptionRight ? 1 : 0;
    const finalScore = this.state.score + isLastOptionCorrect;

    this.props.pullData({
      finalScore: finalScore,
    });
  };

  sendResultToDatabase = (score) => {
    const payload = {
      user_id: this.context.userId,
      user_name: this.context.username,
      quiz_track: this.context.quizTrack,
      difficulty: this.context.difficulty.displayName,
      select_type: this.context.selectType.displayName,
      percentage_correct: (score / this.context.noOfQuestions.value).toFixed(2) * 100,
    };

    axios
      .post(`${helper.DATABASE_URL}/results.json`, payload)
      .then((res) => {
        this.setState({ quizCompleted: true, readyForSubmission: true, sendingResult: false });
      })
      .catch((err) =>
        this.setState({
          sendingResult: false,
          readyForSubmission: true,
          sendErrorExists: true,
          sendErrorMessage: "Problem sending results to cloud, please retry",
        })
      );
  };

  submitQuiz = () => {
    if (this.state.sendingResult) return; // ALready sending, wait till done

    const isLastOptionCorrect = this.state.isCurrentChosenOptionRight ? 1 : 0;
    const finalScore = this.state.score + isLastOptionCorrect;

    this.setState((prevState) => ({
      optionChosen: false,
      sendingResult: true,
    }));

    this.sendResultToDatabase(finalScore);
  };

  render() {
    const questionClassesArr = [classes.Questions];

    if (this.state.isSecondary) {
      questionClassesArr.push(classes.Secondary);
    }
    const questionClasses = questionClassesArr.join(" ");

    let submitBtn = null;
    let nextQuestionBtn = (
      <Button
        btnType={this.state.isSecondary ? "isSecondary" : "isPrimary"}
        clicked={this.moveToNextQuestion}
        disabled={!this.state.optionChosen}
      >
        {"To Question " + (this.state.currentNumber + 1)}
      </Button>
    );

    if (this.state.currentNumber === this.state.totalNoOfQuestionsRetrieved) {
      submitBtn = (
        <Button
          btnType={this.state.isSecondary ? "isSecondary" : "isPrimary"}
          clicked={this.submitQuiz}
          disabled={!this.state.optionChosen}
        >
          {this.state.sendingResult ? "Submitting..." : "Submit"}
        </Button>
      );
      nextQuestionBtn = null;
    }

    let fetchErrorModal = null;
    if (this.state.fetchErrorExists) {
      fetchErrorModal = (
        <Modal message={this.state.fetchErrorMessage} modalCTA={this.fetchErrorModalCTA} btnLabel="Cancel" />
      );
    }

    let sendResultErrorModal = null;
    if (this.state.sendErrorExists) {
      sendResultErrorModal = (
        <>
          <Modal
            message={this.state.sendErrorMessage}
            modalCTA={this.sendResultErrorModalCTA}
            btnLabel="Retry"
            fallbackLabel="Forfeit : ("
            fallbackHandler={this.sendResultfallbackHandler}
          />
          <QuickInfo message="You will lose all your quiz progress if you forfeit" />
        </>
      );
    }

    let questionsField = <Loader color="primary" />;

    if (this.state.questionsLoaded) {
      questionsField = (
        <Aux>
          <div className={classes.Question}>
            <Question
              question={parseStringToHTML(this.state.questions[this.state.currentNumber - 1].question)}
              //
              // The last option is always the correct one before sorting

              options={[
                [
                  ...this.state.questions[this.state.currentNumber - 1].incorrect_answers,
                  this.state.questions[this.state.currentNumber - 1].correct_answer,
                ]
                  .map((el, _, arr) => {
                    if (el === arr[arr.length - 1]) {
                      return { value: parseStringToHTML(el), isCorrect: true };
                    } else
                      return {
                        value: parseStringToHTML(el),
                        isCorrect: false,
                      };
                  })
                  .sort((prev, next) => (prev.value > next.value ? 1 : -1)),
              ]}
              number={this.state.currentNumber}
              isSecondary={this.state.isSecondary}
              changed={this.optionChosenHandler}
            />
          </div>
          {nextQuestionBtn}
          {submitBtn}
        </Aux>
      );
    }

    return (
      <div className={questionClasses}>
        {this.state.questionsLoaded ? (
          <QuickInfo message="Keep an eye on the timer in the top right, good luck!" />
        ) : null}
        {fetchErrorModal}
        {sendResultErrorModal}
        <div className={classes.Container}>
          {this.state.questionsLoaded ? (
            <Timer
              currentQuestion={this.state.currentNumber}
              totalNoOfQuestionsRetrieved={this.state.totalNoOfQuestionsRetrieved}
              readyForSubmission={this.state.readyForSubmission}
              timeUp={
                this.state.currentNumber === this.state.totalNoOfQuestionsRetrieved
                  ? this.submitQuiz
                  : this.moveToNextQuestion
              }
            />
          ) : null}
          {questionsField}
        </div>
        {this.state.quizCompleted ? <Navigate to="/results" /> : null}
      </div>
    );
  }
}

// Create a wrapper component that injects router props
function WithRouterWrapper(props) {
  const navigate = useNavigate();

  return <Questions {...props} navigate={navigate} />;
}

export default WithRouterWrapper;
