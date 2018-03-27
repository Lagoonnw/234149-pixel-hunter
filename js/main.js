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

const renderScreen = (number) => {
  let node = screens[number].cloneNode(true);

  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
  mainScreen.appendChild(node);
};

const onBodyAltArrowPress = (evt) => {
  const lastScreenNumber = screens.length - 1;
  const firstScreenNumber = 0;

  evt.preventDefault();
  if (evt.keyCode === keyCodes.ARROW_RIGHT && evt.altKey && currentScreenNumber < lastScreenNumber) {
    currentScreenNumber++;
    renderScreen(currentScreenNumber);
  } else if (evt.keyCode === keyCodes.ARROW_LEFT && evt.altKey && currentScreenNumber > firstScreenNumber) {
    currentScreenNumber--;
    renderScreen(currentScreenNumber);
  }
};

renderScreen(currentScreenNumber);
document.addEventListener(`keydown`, onBodyAltArrowPress);


