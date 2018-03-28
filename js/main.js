const mainScreen = document.querySelector(`main.central`);
const screens = document.querySelectorAll(`template`);
const lastScreenNumber = screens.length - 1;
const firstScreenNumber = 0;
const Keycode = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
};
let currentScreenNumber = 0;

const renderScreen = (number) => {
  const node = screens[number].content.cloneNode(true);

  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
  mainScreen.appendChild(node);
};

const shouldSwitchToNextScreen = (evt) => evt.keyCode === Keycode.ARROW_RIGHT && currentScreenNumber < lastScreenNumber;

const shouldSwitchToPreviousScreen = (evt) => evt.keyCode === Keycode.ARROW_LEFT && currentScreenNumber > firstScreenNumber;

const onBodyAltArrowPress = (evt) => {
  if (!evt.altKey) {
    return;
  } else {
    if (shouldSwitchToNextScreen(evt)) {
      currentScreenNumber++;
      renderScreen(currentScreenNumber);
    } else if (shouldSwitchToPreviousScreen(evt)) {
      currentScreenNumber--;
      renderScreen(currentScreenNumber);
    }
  }
};

renderScreen(currentScreenNumber);
document.addEventListener(`keydown`, onBodyAltArrowPress);
