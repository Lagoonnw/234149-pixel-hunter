import {gameOneTemplate} from './../templates/game-1.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import {footer} from './../templates/footer.js';
import gameTwoScreen from './game-2.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {initialState, answer} from './../data/game-config.js';
import {answers} from './../data/state-container.js';

const header = renderHeader(initialState);
const statsBar = renderStatsBar(answers);
const page = `${header}\n <div class="game"${gameOneTemplate}\n${statsBar}</div>\n${footer}`;
const gameOneScreen = getElementFromTemplate(page);
const form = gameOneScreen.querySelector(`form`);

const onFormChange = () => {
  const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
  const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;
  if (isFirstOptionChecked && isSecondOptionChecked) {
    answer.correct = true;
    answer.time = 25;
    answers.push(answer);
    console.log(answers[0].correct, answers[0].time, answers[0].type);
    renderScreen(gameTwoScreen);
  }
};

form.addEventListener(`change`, onFormChange);
addBackToIntroHandler(gameOneScreen);

export default gameOneScreen;
