import {getGameOneTemplate} from './../templates/game-1.js';
import renderScreen from './../utils/render-screen.js';
import getElementFromTemplate from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import gameTwoScreen from './game-2.js';
import {Answer} from './../data/answer.js';
import {TOTAL_ANSWERS, Lives} from "../data/game-config.js";

export default (state) => {
  const template = getGameOneTemplate(state);
  const gameOneScreen = getElementFromTemplate(template);
  const form = gameOneScreen.querySelector(`form`);

  const onFormChange = () => {
    const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
    const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;
    if (isFirstOptionChecked && isSecondOptionChecked) {
      const answer = new Answer(true, 15);
      state.addAnswer(answer);
      state.nextLevel();
      renderScreen(gameTwoScreen(state));
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(gameOneScreen);

  return gameOneScreen;
};
