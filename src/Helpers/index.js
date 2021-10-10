export const BASE_URL = "https://opentdb.com/api.php";
// Question number must always be specified

export const DATABASE_URL = "https://tiz-quiz-default-rtdb.firebaseio.com";

export const MAX_LEADERBOARD_NUMBER = 10;

export const TIME_FOR_A_QUESTION = 30;

export const MODIFY_BASE_URL = (
  noOfQuestions = 10,
  CategoryId,
  difficulty,
  selectType
) => {
  const withQuestionBaseURL = `${BASE_URL}?amount=${noOfQuestions}`;
  const modifiedURL =
    // prettier-ignore
    withQuestionBaseURL + 
    (CategoryId ? `&category=${CategoryId}` : "") +
    (difficulty && difficulty !== "any"? `&difficulty=${difficulty}`: "") +
    (selectType && selectType !== "any"?  `&type=${selectType}`: "");

  return modifiedURL;
};

export const parseStringToHTML = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.innerText;
};
