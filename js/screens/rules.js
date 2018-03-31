import {rulesTemplate} from './../templates/rules.js';
import {footer} from './../templates/footer.js';
import gameOneScreen from './game-1.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

const page = `${rulesTemplate}\n${footer}`;
const rulesScreen = getElementFromTemplate(page);
const form = rulesScreen.querySelector(`form`);
const input = form.querySelector(`input`);
const submitBtn = form.querySelector(`.rules__button`);

const validateForm = () => {
  submitBtn.disabled = !form.checkValidity();
};

const onInputKeyUp = () => validateForm();

const onSubmitBtnClick = () => {
  input.removeEventListener(`keyup`, onInputKeyUp);
  renderScreen(gameOneScreen);
};

input.addEventListener(`keyup`, onInputKeyUp);
submitBtn.addEventListener(`click`, onSubmitBtnClick);
addBackToIntroHandler(rulesScreen);

export default rulesScreen;