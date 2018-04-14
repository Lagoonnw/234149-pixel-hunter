import {getGameTwoTemplate} from './../templates/game-2.js';
import gameThreeScreen from './game-3.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {Answer} from './../data/answer.js';

export default (state) => {
  const template = getGameTwoTemplate(state);
  const screen = getElementFromTemplate(template);
  const form = screen.querySelector(`form`);

  const onFormChange = () => {
    const isOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;

    if (isOptionChecked) {
      const answer = new Answer(false, 30);
      state.addAnswer(answer);
      state.nextLevel();
      renderScreen(gameThreeScreen(state));
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(screen);

  return screen;
};
