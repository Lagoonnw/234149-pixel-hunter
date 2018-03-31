import {greetingTemplate} from './../templates/greeting.js';
import {footer} from './../templates/footer.js';
import {default as rulesScreen} from './rules.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';

const page = `${greetingTemplate}\n${footer}`;
const greetingScreen = getElementFromTemplate(page);
const arrow = greetingScreen.querySelector(`.greeting__continue`);

const onArrowClick = (evt) => {
  evt.preventDefault();
  renderScreen(rulesScreen);
};

arrow.addEventListener(`click`, onArrowClick);

export {greetingScreen as default};
