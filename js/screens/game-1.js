import {getGameOneTemplate} from './../templates/game-1.js';
import renderScreen from './../utils/render-screen.js';
import getElementFromTemplate from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import gameTwoScreen from './game-2.js';
import statsScreen from './stats.js';
import {Answer} from './../data/answer.js';
import {Time, TimerBreakPoints} from "../data/game-config.js";
import randomNumber from './../utils/random-number.js';

export default (state) => {
  const template = getGameOneTemplate(state);
  const screen = getElementFromTemplate(template);
  const form = screen.querySelector(`form`);

  const checkAnswer = (value, answer) => value === answer;


  const isAnswerCorrect = () => {
    const [firstAnswer, secondAnswer] = state.questions[state.level].answers;
    const firstUserAnswer = form.querySelector(`form [name=question1]:checked`).value;
    const secondUserAnswer = form.querySelector(`form [name=question2]:checked`).value;
    const isFirstAnswerCorrect = checkAnswer(firstUserAnswer, firstAnswer);
    const isSecondAnswerCorrect = checkAnswer(secondUserAnswer, secondAnswer);

    return isFirstAnswerCorrect && isSecondAnswerCorrect;
  };

  const onFormChange = () => {
    const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
    const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;

    if (isFirstOptionChecked && isSecondOptionChecked) {
      const answer = new Answer(isAnswerCorrect(), randomNumber(Time.MIN, TimerBreakPoints.FAST));
      state.addAnswer(answer);
      if (state.nextLevel() === -1) {
        renderScreen(statsScreen(state));
      } else {
        renderScreen(gameTwoScreen(state));
      }
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(screen);

  return screen;
};
