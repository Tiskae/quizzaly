import React from "react";
import * as classes from "./AuthorInfo.module.css";

const AuthorInfo = (props) => {
  // const shareBtnHandler = (appName) => {
  //   if (appName) {
  //     setState({
  //       ...state,
  //       showShareComponent: !state.showShareComponent,
  //       shareSuccessMessage: appName,
  //     });
  //     setTimeout(
  //       () =>
  //         setState({
  //           ...state,
  //           showShareComponent: false,
  //           shareSuccessMessage: "",
  //         }),
  //       4000
  //     );
  //   } else
  //     setState({
  //       ...state,
  //       showShareComponent: !state.showShareComponent,
  //       shareSuccessMessage: "",
  //     });
  // };

  return (
    <div className={classes.AuthorInfo}>
      <p>?</p>
    </div>
  );
};

export default AuthorInfo;
