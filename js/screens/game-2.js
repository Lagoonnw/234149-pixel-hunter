import {gameTwoTemplate} from './../templates/game-2.js';
import {header} from './../templates/header.js';
import {footer} from './../templates/footer.js';
import {default as gameThreeScreen} from './game-3.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

const page = `${header}\n${gameTwoTemplate}\n${footer}`;
const gameTwoScreen = getElementFromTemplate(page);
const form = gameTwoScreen.querySelector(`form`);

const onFormChange = () => {
  const isOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;

  if (isOptionChecked) {
    renderScreen(gameThreeScreen);
  }
};

form.addEventListener(`change`, onFormChange);
addBackToIntroHandler(gameTwoScreen);

export {gameTwoScreen as default};
