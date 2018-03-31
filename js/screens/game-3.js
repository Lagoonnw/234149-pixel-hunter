import {gameThreeTemplate} from './../templates/game-3.js';
import {header} from './../templates/header.js';
import {footer} from './../templates/footer.js';
import {default as statsScreen} from './stats.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {default as renderScreen} from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

const page = `${header}\n${gameThreeTemplate}\n${footer}`;
const gameThreeScreen = getElementFromTemplate(page);
const options = gameThreeScreen.querySelectorAll(`.game__option `);

const onOptionClick = () => {
  renderScreen(statsScreen);
};

for (let option of options) {
  option.addEventListener(`click`, onOptionClick);
}
addBackToIntroHandler(gameThreeScreen);

export default gameThreeScreen;
