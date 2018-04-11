import {gameOneTemplate} from './../templates/game-1.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import {footer} from './../templates/footer.js';
import gameTwoScreen from './game-2.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {initialState, currentGameState} from './../data/game-config.js';
import {Answer} from './../data/answer.js';

const header = renderHeader(initialState);
const statsBar = renderStatsBar(currentGameState.answers);
const page = `${header}\n <div class="game"${gameOneTemplate}\n${statsBar}</div>\n${footer}`;
const gameOneScreen = getElementFromTemplate(page);
const form = gameOneScreen.querySelector(`form`);

const onFormChange = () => {
  const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
  const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;
  if (isFirstOptionChecked && isSecondOptionChecked) {
    const answer = new Answer(true, 15);
    currentGameState.answers.push(answer);
    // console.log(gameTwoScreen(currentGameState));
    renderScreen(gameTwoScreen(currentGameState));
  }
};

form.addEventListener(`change`, onFormChange);
addBackToIntroHandler(gameOneScreen);

export default gameOneScreen;
