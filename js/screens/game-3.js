import {getThreeTemplate} from './../templates/game-3.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import statsScreen from './stats.js';
import gameOneScreen from './game-1';
import {Answer} from "../data/answer";
import {Time, TimerBreakPoints} from "../data/game-config";
import randomNumber from "../utils/random-number";

export default (state) => {
  const page = getThreeTemplate(state);
  const screen = getElementFromTemplate(page);
  const options = screen.querySelectorAll(`.game__option`);

  const isAnswerCorrect = (option) => {
    const userAnswer = Array.from(options).indexOf(option);
    return state.questions[state.level].answers[userAnswer];
  };

  const onOptionClick = (evt) => {
    const answer = new Answer(isAnswerCorrect(evt.target), randomNumber(TimerBreakPoints.SLOW, Time.MAX));
    state.addAnswer(answer);
    if (state.nextLevel() === -1) {
      renderScreen(statsScreen(state));
    } else {
      renderScreen(gameOneScreen(state));
    }
  };

  for (let option of options) {
    option.addEventListener(`click`, onOptionClick);
  }
  addBackToIntroHandler(screen);

  return screen;
};
