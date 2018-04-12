import {renderGameOneTemplate} from './../templates/game-1.js';
import {footer} from './../templates/footer.js';
import renderStatsBar from './../templates/stats-bar.js';
import renderHeader from './../templates/header.js';
import renderScreen from './../utils/render-screen.js';
import getElementFromTemplate from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';
import {shouldShowStats} from "../utils/shold-show-stats.js";
import gameTwoScreen from './game-2.js';
import {Answer} from './../data/answer.js';
import {images} from './../data/data.js';
import statsScreen from './stats.js';
import {TOTAL_ANSWERS, Lives} from "../data/game-config.js";

export default (state) => {
  const header = renderHeader(state);
  const statsBar = renderStatsBar(state.userAnswers);
  const gameOneTemplate = renderGameOneTemplate(state.questions[state.level]);
  const page = `${header}\n <div class="game" ${gameOneTemplate}\n${statsBar}</div>\n${footer}`;
  const gameOneScreen = getElementFromTemplate(page);
  const form = gameOneScreen.querySelector(`form`);

  const onFormChange = () => {
    const isFirstOptionChecked = form.querySelector(`form [name=question1]:checked`) !== null;
    const isSecondOptionChecked = form.querySelector(`form [name=question2]:checked`) !== null;
    if (isFirstOptionChecked && isSecondOptionChecked) {
      if (shouldShowStats(state)) {
        renderScreen(statsScreen);
      }
      const answer = new Answer(true, 15);
      state.addAnswer(answer);
      state.nextLevel();
      renderScreen(gameTwoScreen(state));
    }
  };

  form.addEventListener(`change`, onFormChange);
  addBackToIntroHandler(gameOneScreen);

  return gameOneScreen;
};
