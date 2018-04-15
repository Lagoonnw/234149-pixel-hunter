import {getGameTwoTemplate} from './../templates/game-2.js';
import gameThreeScreen from './game-3.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {Answer} from './../data/answer.js';
import statsScreen from './stats';
import randomNumber from './../utils/random-number.js';
import {TimerBreakPoints} from "../data/game-config.js";

export default (state) => {
  const template = getGameTwoTemplate(state);
  const screen = getElementFromTemplate(template);
  const form = screen.querySelector(`form`);

  const isAnswerCorrect = () => {
    const [answer] = state.questions[state.level].answers;
    const userAnswer = form.querySelector(`form [name=question1]:checked`).value;

    return userAnswer === answer;
  };

  const onFormChange = () => {
    const isOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;

    if (isOptionChecked) {
      const answer = new Answer(isAnswerCorrect(), randomNumber(TimerBreakPoints.FAST, TimerBreakPoints.SLOW));
      state.addAnswer(answer);
      if (state.nextLevel() === -1) {
        renderScreen(statsScreen(state));
      } else {
        renderScreen(gameThreeScreen(state));
      }
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(screen);

  return screen;
};
