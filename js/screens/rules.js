import getRulesTemplate from './../templates/rules.js';
import gameOneScreen from './game-1.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

export default (state) => {
  const page = getRulesTemplate();
  const screen = getElementFromTemplate(page);
  const form = screen.querySelector(`form`);
  const input = form.querySelector(`input`);
  const submitBtn = form.querySelector(`.rules__button`);

  const validateForm = () => {
    submitBtn.disabled = !form.checkValidity();
  };

  const onInputKeyUp = () => validateForm();

  const onSubmitBtnClick = () => {
    state.newUserName = String.raw`${input.value.trim()}`;
    input.removeEventListener(`keyup`, onInputKeyUp);
    renderScreen(gameOneScreen(state));
  };

  input.addEventListener(`keyup`, onInputKeyUp);
  submitBtn.addEventListener(`click`, onSubmitBtnClick);
  addBackToIntroHandler(screen);

  return screen;
};
