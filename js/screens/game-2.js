import {gameTwoTemplate} from './../templates/game-2.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import {footer} from './../templates/footer.js';
import {default as gameThreeScreen} from './game-3.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {initialState} from './../data/game-config.js';
import {answers} from './../data/state-container.js';

const header = renderHeader(initialState);
const statsBar = renderStatsBar(answers);
console.log(answers, statsBar);
const page = `${header}\n<div class="game">${gameTwoTemplate}${statsBar}</div>\n${footer}`;
const gameTwoScreen = getElementFromTemplate(page);
const form = gameTwoScreen.querySelector(`form`);

const onFormChange = () => {
  const isOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;

  if (isOptionChecked) {
    answers.push({correct: true, time: 15});
    console.log(answers);
    renderScreen(gameThreeScreen);
  }
};

form.addEventListener(`change`, onFormChange);
addBackToIntroHandler(gameTwoScreen);


export default gameTwoScreen;
