import {default as renderScreen} from './../utils/render-screen.js';
import {default as introScreen} from './../screens/intro.js';

const onArrowClick = () => {
  renderScreen(introScreen);
};

export const addBackToIntroHandler = (screen) => {
  const arrowBack = screen.querySelector(`button.back`);
  arrowBack.addEventListener(`click`, onArrowClick);
};


