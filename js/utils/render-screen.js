const mainScreen = document.querySelector(`main.central`);

const clearMainScreen = () => {
  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
};

const renderScreen = (screen) => {
  clearMainScreen();
  mainScreen.appendChild(screen);
};

export default renderScreen;
