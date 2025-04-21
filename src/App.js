// Library componens imports
import React, { Component } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/preferences" element={<Preferences pullData={this.setStateFromPreferences} />} />
            {this.state.username ? (
              <Route
                path="/questions"
                element={<Questions pullData={this.setStateFromQuestions} URLToFetch={this.state.URLToFetch} />}
              />
            ) : null}
            {this.state.username ? <Route path="/results" element={<Results />} /> : null}
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <AuthorInfo />
        </AppContext.Provider>
      </div>
    );
  }
}

// Create a wrapper component that injects router props
function WithRouterWrapper(props) {
  const navigate = useNavigate();

  return <App {...props} navigate={navigate} />;
}

export default WithRouterWrapper;
