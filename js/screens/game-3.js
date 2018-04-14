import {getThreeTemplate} from './../templates/game-3.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import statsScreen from './stats.js';

export default (state) => {
  const page = getThreeTemplate(state);
  const screen = getElementFromTemplate(page);
  const options = screen.querySelectorAll(`.game__option `);

  const onOptionClick = () => {
    renderScreen(statsScreen(state));
  };

  for (let option of options) {
    option.addEventListener(`click`, onOptionClick);
  }
  addBackToIntroHandler(screen);

  return screen;
};
