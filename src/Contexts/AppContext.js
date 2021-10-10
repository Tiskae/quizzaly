import React from "react";

const AppContext = React.createContext({
  userInfoSubmitted: false,
  username: null,
  noOfQuestions: null,
  quizTrack: null,
  isFirstTimer: null,
  difficulty: null,
  selectType: { value: null, displayName: null },
  finalScore: 100,
  prevScore: null,
  URLToFetch: null,
  userId: null,
});

export default AppContext;
