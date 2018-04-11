import {getWrongAnswersNumber} from "./get-wrong-answers-number.js";
import statsScreen from "../screens/stats";
import {Lives, TOTAL_ANSWERS} from "../data/game-config";

export const shouldShowStats = (state) => {
  if (state.level < TOTAL_ANSWERS) {
    return;
  }
  if (getWrongAnswersNumber(state.userAnswers) <= Lives.MAX) {
    return;
  }
  return true;
}
