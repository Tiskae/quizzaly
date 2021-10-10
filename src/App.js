// Library componens imports
import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

// Component imports
import IntroPage from "./components/IntroPage/IntroPage";
import Hero from "./components/Hero/Hero";
import Questions from "./containers/Questions/Questions";
import Preferences from "./components/Preferences/Preferences";
import AppContext from "./Contexts/AppContext";
import Results from "./components/Results/Results";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import AuthorInfo from "./components/AuthorInfo/AuthorInfo";

// CSS imports
import "./App.css";

class App extends Component {
  state = {
    userInfoSubmitted: false,
    username: null,
    noOfQuestions: null,
    quizTrack: null,
    URLToFetch: null,
    difficulty: null,
    selectType: null,
    finalScore: null,
    tracksAndTheirIDs: null,
    userId: null,
  };

  setStateFromPreferences = (payload) => {
    this.setState({
      userInfoSubmitted: payload.userInfoSubmitted,
      username: payload.username,
      quizTrack: payload.quizTrack,
      URLToFetch: payload.URLToFetch,
      difficulty: payload.difficulty,
      noOfQuestions: payload.noOfQuestions,
      selectType: payload.selectType,
      tracksAndTheirIDs: payload.tracksAndTheirIDs,
      userId: payload.userId,
    });
  };

  setStateFromQuestions = (payload) => {
    this.setState({
      finalScore: payload.finalScore,
    });
  };

  render() {
    return (
      <div className="App">
        <AppContext.Provider
          value={{
            userInfoSubmitted: this.state.userInfoSubmitted,
            username: this.state.username,
            quizTrack: this.state.quizTrack,
            URLToFetch: this.state.URLToFetch,
            noOfQuestions: this.state.noOfQuestions,
            difficulty: this.state.difficulty,
            selectType: this.state.selectType,
            tracksAndTheirIDs: this.state.tracksAndTheirIDs,
            finalScore: this.state.finalScore,
            userId: this.state.userId,
          }}
        >
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route path="/intro" component={IntroPage} />
            <Route
              path="/preferences"
              render={() => (
                <Preferences pullData={this.setStateFromPreferences} />
              )}
            />
            <Route
              path="/questions"
              render={() => (
                <Questions
                  pullData={this.setStateFromQuestions}
                  URLToFetch={this.state.URLToFetch}
                />
              )}
            />
            <Route path="/results" component={Results} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Redirect from="/" to="/" />
          </Switch>
          <AuthorInfo />
        </AppContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
