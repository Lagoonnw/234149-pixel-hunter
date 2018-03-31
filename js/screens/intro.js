import {introTemplate} from './../templates/intro.js';
import {footer} from './../templates/footer.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {default as greetingsScreen} from './greeting.js';

const page = `${introTemplate}\n${footer}`;
const introScreen = getElementFromTemplate(page);
const asterisk = introScreen.querySelector(`.intro__asterisk`);

const onAsteriskClick = () => {
  renderScreen(greetingsScreen);
};

asterisk.addEventListener(`click`, onAsteriskClick);

export default introScreen;
