import {getStatsTemplate} from "./../templates/stats.js";
import {footer} from './../templates/footer.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

export default (state) => {

  const page = getStatsTemplate(state);
  const screen = getElementFromTemplate(page);

  addBackToIntroHandler(screen);
  return screen;
};
