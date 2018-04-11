import {gameTwoTemplate} from './../templates/game-2.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import {footer} from './../templates/footer.js';
import {default as gameThreeScreen} from './game-3.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {initialState, currentGameState} from './../data/game-config.js';
// import {answers} from './../data/state-container.js';
import {Answer} from './../data/answer.js';

export default (data) => {
  const header = renderHeader(data);
  const statsBar = renderStatsBar(data.answers);
  const page = `${header}\n<div class="game">${gameTwoTemplate}${statsBar}</div>\n${footer}`;
  console.log(page);
  const screen = getElementFromTemplate(page);
  const form = screen.querySelector(`form`);

  const onFormChange = () => {
    const isOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;

    if (isOptionChecked) {
      const answer = new Answer(false, 30);
      currentGameState.answers.push(answer);
      renderScreen(gameThreeScreen(currentGameState));
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(screen);

  return screen;
};
