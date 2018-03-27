const body = document.querySelector(`body`);
const mainScreen = document.querySelector(`main.central`);
const greetingScreen = document.querySelector(`#greeting`).content;
const rulesScreen = document.querySelector(`#rules`).content;
const statsScreen = document.querySelector(`#stats`).content;
const game1Screen = document.querySelector(`#game-1`).content;
const game2Screen = document.querySelector(`#game-2`).content;
const game3Screen = document.querySelector(`#game-3`).content;
const screens = [greetingScreen, rulesScreen, game1Screen, game2Screen, game3Screen, statsScreen];
const keyCodes = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
};
let currentScreenNumber = 0;

const renderScreen = (screenNumber) => {
  let node = screens[screenNumber].cloneNode(true);

  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
  mainScreen.appendChild(node);
};

const onBodyAltArrowPress = (evt) => {
  e.preventDefault();
  if (evt.keyCode === keyCodes.ARROW_RIGHT && evt.altKey && currentScreenNumber < (screens.length - 1)) {
    currentScreenNumber++;
    renderScreen(currentScreenNumber);
  } else if (evt.keyCode === keyCodes.ARROW_LEFT && evt.altKey && currentScreenNumber > 0) {
    currentScreenNumber--;
    renderScreen(currentScreenNumber);
  }
  document.removeEventListener(`keydown`, onBodyAltArrowPress);
};

renderScreen(currentScreenNumber);
body.addEventListener(`keydown`, onBodyAltArrowPress);


