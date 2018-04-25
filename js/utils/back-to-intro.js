import Application from './../application.js';
import {showMessage} from './show-message.js';

export default class BackToIntro {
  constructor() {
  }

  set element(element) {
    this._element = element;
  }

  bind() {
    const timeToGo = 3000;
    this.arrow = this._element.querySelector(`button.back`);
    this.onArrowClick = (evt) => {
      evt.preventDefault();
      this.onClick();
      showMessage(`Ваш игровой прогресс будет потерян`);
      setTimeout(() => {
        Application.showIntro();
      }, timeToGo);
    };

    this.arrow.addEventListener(`click`, this.onArrowClick);
  }

  unbind() {
    this.arrow.removeEventListener(`click`, this.onArrowClick);
  }

  onClick() {
  }
}
