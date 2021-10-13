import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as classes from "./InputForm.module.css";
import Button from "../../../UI/Button/Button";
import InputField from "../../../UI/InputField/InputField";
import SelectField from "../../../UI/SelectField/SelectField";
// import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";
import Loader from "../../../UI/Loader/Loader";
import axios from "axios";
import * as helpers from "../../../Helpers";
import Modal from "../../../UI/Modal/Modal";
import AppContext from "../../../Contexts/AppContext";
import Instructions from "./Instructions/Instructions";

class InputForm extends Component {
  state = {
    formData: {
      name: {
        id: "name",
        label: "What is your name?",
        inputType: "text",
        value: "",
      },

      tracks: {
        options: null,
        defaultOption: "Choose",
      },
      difficulty: {
        options: [
          { displayName: "Any", value: "any" },
          { displayName: "Easy", value: "easy" },
          { displayName: "Medium", value: "medium" },
          { displayName: "Hard", value: "hard" },
        ],
        defaultOption: "Choose",
      },
      selectType: {
        options: [
          { displayName: "Any", value: "any" },
          { displayName: "Multiple Choice", value: "multiple" },
          { displayName: "True / False", value: "boolean" },
        ],
        defaultOption: "Choose",
      },
      numberOfQuestion: {
        options: [10, 15, 20],
        defaultOption: "Choose",
      },
    },
    activeSlide: 1,
    username: null,
    activeTrack: { value: null, id: null },
    activeDifficulty: { displayName: null, value: null },
    activeSelectType: { displayName: null, value: null },
    activeNumberofQuestions: { value: null },
    tracksAndTheirIDs: [],
    errorMessage: null,
    errorExists: false,
    allSet: false,
    userInfoSubmitted: false,
    userId: null,
    visitedSlide2: false,
  };

  static contextType = AppContext;

  setTracksFromFetchedData = (data) => {
    return data
      .map((el) => el.name)
      .sort((prev, next) => (prev > next ? 1 : -1));
  };

  fetchTracksAndIDsFromAPI = () => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        this.setState((prevState) => ({
          noOfQuestions: res.data.trivia_categories.length,
          tracksAndTheirIDs: res.data.trivia_categories,
          formData: {
            ...prevState.formData,
            tracks: {
              options: this.setTracksFromFetchedData(
                res.data.trivia_categories
              ),
              defaultOption: prevState.formData.tracks.defaultOption,
            },
          },
          userId: new Date().getTime(),
        }));
      })
      .catch((err) => {
        this.setState({
          errorExists: true,
          errorMessage:
            "Couldn't fetch needed information, make sure you have internet access and try again!",
        });
      });
  };

  fetchUserDataFromContext = () => {
    // Only for when the user data exists before
    // and redirected from <Questions/>

    if (!this.context.username) {
      this.fetchTracksAndIDsFromAPI();

      return;
    }

    const track = {
      value: this.context.quizTrack,
      id: this.context.tracksAndTheirIDs.filter(
        (el) => el.name === this.context.quizTrack
      )[0].id,
    };

    const newState = {
      userInfoSubmitted: this.context.userInfoSubmitted,
      username: this.context.username,
      activeTrack: { ...track },
      activeDifficulty: { ...this.context.difficulty },
      activeSelectType: { ...this.context.selectType },
      activeNumberofQuestions: { value: this.context.noOfQuestions.value },
      tracksAndTheirIDs: [...this.context.tracksAndTheirIDs],
      userId: this.context.userId,
    };

    this.setState((prevState) => {
      return {
        ...newState,
        tracksAndTheirIDs: this.context.tracksAndTheirIDs,
        formData: {
          ...prevState.formData,
          tracks: {
            options: this.setTracksFromFetchedData(
              this.context.tracksAndTheirIDs
            ),
            defaultOption: prevState.formData.tracks.defaultOption,
          },
        },
      };
    });
  };

  init = () => {
    // console.log(this.context);
    if (this.context.userInfoSubmitted) {
      this.fetchUserDataFromContext();
    } else {
      this.fetchTracksAndIDsFromAPI();
    }
  };

  componentDidMount() {
    this.init();
  }

  moveToNextSlide = (event) => {
    event.preventDefault();
    this.setState({ activeSlide: 2, visitedSlide2: true });
  };

  nameChangedHandler = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          name: {
            ...prevState.formData.name,
            value: event.target.value,
          },
        },
        username: event.target.value.trim(),
      };
    });
  };

  trackChangedHandler = (event) => {
    if (event.target.value === "Choose") {
      this.setState({
        activeTrack: {
          value: null,
          id: null,
        },
      });
    } else {
      this.setState({
        activeTrack: {
          value: event.target.value,
          id: this.state.tracksAndTheirIDs.filter(
            (el) => el.name === event.target.value
          )[0].id,
        },
      });
    }
  };

  difficultyChangedHandler = (event) => {
    if (event.target.value === "Choose") {
      this.setState({
        activeDifficulty: { value: null },
      });
    } else {
      this.setState({
        activeDifficulty: {
          value: this.state.formData.difficulty.options.filter(
            (el) => el.displayName === event.target.value
          )[0].value,
          displayName: event.target.value,
        },
      });
    }
  };

  selectTypeChangedHandler = (event) => {
    if (event.target.value === "Choose") {
      this.setState({
        activeSelectType: { displayName: null, value: null },
      });
    } else {
      this.setState({
        activeSelectType: {
          displayName: event.target.value,
          value: this.state.formData.selectType.options.filter(
            (el) => el.displayName === event.target.value
          )[0].value,
        },
      });
    }
  };

  numberOfQuestionChangedHandler = (event) => {
    if (event.target.value === "Choose") {
      this.setState({
        activeNumberofQuestions: { value: null },
      });
    } else {
      this.setState({ activeNumberofQuestions: { value: event.target.value } });
    }
  };

  moveBackToPreviousSlide = (event) => {
    event.preventDefault();
    this.setState({ activeSlide: 1 });
  };

  pushDataToParentEl = () => {
    const modifiedURL = helpers.MODIFY_BASE_URL(
      this.state.activeNumberofQuestions.value,
      // 2,
      this.state.activeTrack.id,
      this.state.activeDifficulty.value,
      this.state.activeSelectType.value
    );

    this.props.pushData({
      userInfoSubmitted: true,
      username: this.state.username,
      quizTrack: this.state.activeTrack.value,
      URLToFetch: modifiedURL,
      difficulty: this.state.activeDifficulty,
      noOfQuestions: this.state.activeNumberofQuestions,
      selectType: this.state.activeSelectType,
      tracksAndTheirIDs: this.state.tracksAndTheirIDs,
      userId: this.state.userId,
    });
  };

  closeModalHandler = () => {
    console.log("Reloaded!!!!!");
    // this.props.history.push("/preferences");
    console.log(this.props);
    this.setState({ errorExists: false, errorMessage: null });
    this.fetchTracksAndIDsFromAPI();
  };

  toggleInstructions = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({ allSet: !prevState.allSet }));
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.errorExists) return;

    this.pushDataToParentEl();
    this.props.history.push("/questions");
  };

  render() {
    const tracksFieldsArr = (
      <SelectField
        options={this.state.formData.tracks.options}
        // defaultOpt={this.state.formData.tracks.defaultOption}
        changed={this.trackChangedHandler}
        defaultOpt={
          this.state.activeTrack.value &&
          (this.state.userInfoSubmitted || this.state.visitedSlide2)
            ? this.state.activeTrack.value
            : this.state.formData.tracks.defaultOption
        }
      />
    );

    const difficultyFieldsArr = (
      <SelectField
        options={this.state.formData.difficulty.options.map(
          (el) => el.displayName
        )}
        defaultOpt={
          this.state.activeDifficulty.displayName &&
          (this.state.userInfoSubmitted || this.state.visitedSlide2)
            ? this.state.activeDifficulty.displayName
            : this.state.formData.difficulty.defaultOption
        }
        changed={this.difficultyChangedHandler}
      />
    );

    const selectTypeField = (
      <SelectField
        options={this.state.formData.selectType.options.map(
          (el) => el.displayName
        )}
        defaultOpt={
          this.state.activeSelectType.displayName &&
          this.state.userInfoSubmitted
            ? this.state.activeSelectType.displayName
            : this.state.formData.selectType.defaultOption
        }
        changed={this.selectTypeChangedHandler}
      />
    );

    const selectNumberOfQuestion = (
      <SelectField
        options={this.state.formData.numberOfQuestion.options}
        defaultOpt={
          this.state.activeNumberofQuestions.value &&
          this.state.userInfoSubmitted
            ? this.state.activeNumberofQuestions.value
            : this.state.formData.numberOfQuestion.defaultOption
        }
        changed={this.numberOfQuestionChangedHandler}
      />
    );

    const slide1 = (
      <div className={classes.FormFields}>
        <div className={classes.TrackField}>
          <InputField
            id={this.state.formData.name.id}
            label={this.state.formData.name.label}
            inputType={this.state.formData.name.inputType}
            changed={(event) => this.nameChangedHandler(event)}
            value={this.state.username ? this.state.username : ""}
          />
        </div>
        <div className={classes.TrackField}>
          <h3>Select your quiz track</h3>
          {tracksFieldsArr}
        </div>
        <div className={classes.TrackField}>
          <h3>Select your difficulty level</h3>
          {difficultyFieldsArr}
        </div>
        <Button
          btnType="isSecondary"
          disabled={
            !(
              this.state.username &&
              this.state.activeTrack.value &&
              this.state.activeDifficulty.value
            )
          }
          clicked={this.moveToNextSlide}
        >
          Next
        </Button>
      </div>
    );

    const slide2 = (
      <div className={classes.FormFields}>
        <Button btnType="inline" clicked={this.moveBackToPreviousSlide}>
          <span>{"<"}</span>
          go back
        </Button>
        <div className={classes.TrackField}>
          <h3>How would you like your options</h3>
          {selectTypeField}
        </div>
        <div className={classes.TrackField}>
          <h3>How many questions you want?</h3>
          {selectNumberOfQuestion}
        </div>
        <Button
          btnType="isSecondary"
          disabled={
            !(
              this.state.activeSelectType.value &&
              this.state.activeNumberofQuestions.value
            )
          }
          clicked={this.toggleInstructions}
        >
          Submit
        </Button>
      </div>
    );

    let content = <Loader color="secondary" />;

    let errorModal = this.state.errorExists ? (
      <Modal
        message={this.state.errorMessage}
        modalCTA={this.closeModalHandler}
        btnLabel="Retry"
      />
    ) : null;

    if (this.state.formData.tracks.options) {
      content = this.state.activeSlide === 1 ? slide1 : slide2;
    }

    let instructions = null;
    if (this.state.allSet)
      instructions = (
        <Instructions
          success={this.formSubmitHandler}
          close={this.toggleInstructions}
          track={this.state.activeTrack.value}
          difficulty={this.state.activeDifficulty.value}
          selectType={this.state.activeSelectType.displayName}
          noOfQuestions={this.state.activeNumberofQuestions.value}
        />
      );

    return (
      <form className={classes.Form}>
        <h2>Let's dive right in!</h2>
        <div className={classes.SlideIndicator}>
          <span className={classes.Active}></span>
          <span
            className={this.state.activeSlide === 2 ? classes.Active : null}
          ></span>
        </div>
        {content}
        {errorModal}
        {instructions}
      </form>
    );
  }
}

export default withRouter(InputForm);
