const mainScreen = document.querySelector(`main.central`);
const screens = document.querySelectorAll(`template`);
const keyCodes = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
};
let currentScreenNumber = 0;

const renderScreen = (number) => {
  let node = screens[number].content.cloneNode(true);

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


