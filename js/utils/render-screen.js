const mainScreen = document.querySelector(`main.central`);

const clearMainScreen = () => {
  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
};

const setSrcToImgs = (screen) => {
  const imgs = screen.querySelectorAll(`img[data-src]`);
  if (!imgs) {
    return;
  }
  for (const img of imgs) {
    const value = img.dataset.src;
    img.setAttribute(`src`, value);
  }
};

const renderScreen = (screen) => {
  setSrcToImgs(screen);
  clearMainScreen();
  mainScreen.appendChild(screen);
};

export default renderScreen;
