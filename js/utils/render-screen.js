const mainScreen = document.querySelector(`main.central`);

const clearMainScreen = () => {
  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
};

const renderScreen = (screen) => {
  const imgs = screen.querySelectorAll(`img[data-src]`);
  if (imgs) {
    for (const img of imgs) {
      const value = img.dataset.src;
      img.setAttribute(`src`, value);
    }
  }
  clearMainScreen();
  mainScreen.appendChild(screen);
};

export default renderScreen;
