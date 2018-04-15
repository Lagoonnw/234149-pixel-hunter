import getGreetingTemplate from './../templates/greeting.js';
import rulesScreen from './rules.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';

export default (state) => {
  const page = getGreetingTemplate();
  const screen = getElementFromTemplate(page);
  const arrow = screen.querySelector(`.greeting__continue`);

  const onArrowClick = (evt) => {
    evt.preventDefault();
    renderScreen(rulesScreen(state));
  };

  arrow.addEventListener(`click`, onArrowClick);

  return screen;
};
