import AbstractView from '../../abstract-view.js';
import {Lives, Time, TOTAL_ANSWERS} from '../../data/game-config';
import {footer} from '../../templates/footer';
import {addBackToIntroHandler} from '../../utils/back-to-intro.js';
import BackToIntro from "../../utils/back-to-intro.js";

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    this._template = `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай ${TOTAL_ANSWERS} раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится ${Time.MAX} секунд.<br>
        Ошибиться можно не более ${Lives.MAX} раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя" required>
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>${footer}`;

    return this._template;
  }

  bind() {
    this.form = this.element.querySelector(`form`);
    this.input = this.form.querySelector(`input`);
    this.submitBtn = this.form.querySelector(`.rules__button`);
    this.backToIntro = new BackToIntro(this.element);
    this.onInputKeyUp = (evt) => {
      this.submitBtn.disabled = !this.form.checkValidity();
    }

    this.onSubmitBtnClick = (evt) => {
      evt.preventDefault();
      this.onClick();
    };

    this.backToIntro.bind();
    this.input.addEventListener(`keyup`, this.onInputKeyUp);
    this.submitBtn.addEventListener(`click`, this.onSubmitBtnClick);
  }

  unbind() {
    this.input.removeEventListener(`keyup`, this.onInputKeyUp);
    this.submitBtn.removeEventListener(`click`, this.onSubmitBtnClick);
    this.backToIntro.unbind();
  }

  onClick() {
  }

  onBack() {
  }
}
