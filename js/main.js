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
let currentScreenNumber = -1;

const renderScreen = (screenNumber) => {
  let node = screens[screenNumber].cloneNode(true);

  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
  mainScreen.appendChild(node);
};


const onDocumentAltArrowPress = (e) => {
  e.preventDefault();
  if (e.keyCode === keyCodes.ARROW_RIGHT && e.altKey && currentScreenNumber < (screens.length - 1)) {
    currentScreenNumber++;
    renderScreen(currentScreenNumber);
  } else if (e.keyCode === keyCodes.ARROW_LEFT && e.altKey && currentScreenNumber > 0) {
    currentScreenNumber--;
    renderScreen(currentScreenNumber);
  }
  document.removeEventListener(`keydown`, onDocumentAltArrowPress);
};

body.addEventListener(`keydown`, onDocumentAltArrowPress);


