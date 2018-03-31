import {gameOneTemplate} from './../templates/game-1.js';
import {header} from './../templates/header.js';
import {footer} from './../templates/footer.js';
import gameTwoScreen from './game-2.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

const page = `${header}\n${gameOneTemplate}\n${footer}`;
const gameOneScreen = getElementFromTemplate(page);
const form = gameOneScreen.querySelector(`form`);

const onFormChange = () => {
  const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
  const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;
  if (isFirstOptionChecked && isSecondOptionChecked) {
    renderScreen(gameTwoScreen);
  }
};

form.addEventListener(`change`, onFormChange);
addBackToIntroHandler(gameOneScreen);

export default gameOneScreen;
