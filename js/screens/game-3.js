import {gameThreeTemplate} from './../templates/game-3.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import {footer} from './../templates/footer.js';
import {default as statsScreen} from './stats.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {initialState, currentGameState} from './../data/game-config.js';

export default (data) => {
  const header = renderHeader(data);
  const statsBar = renderStatsBar(data.answers);
  const page = `${header}\n<div class="game">${gameThreeTemplate}${statsBar}</div>\n${footer}`;
  const gameThreeScreen = getElementFromTemplate(page);
  const options = gameThreeScreen.querySelectorAll(`.game__option `);

  const onOptionClick = () => {
    renderScreen(statsScreen);
  };

  for (let option of options) {
    option.addEventListener(`click`, onOptionClick);
  }
  addBackToIntroHandler(gameThreeScreen);

  return gameThreeScreen;
};
