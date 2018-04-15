import {getStatsTemplate} from "./../templates/stats.js";
import getElementFromTemplate from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

export default (state) => {
  const page = getStatsTemplate(state);
  const screen = getElementFromTemplate(page);

  addBackToIntroHandler(screen);
  return screen;
};
