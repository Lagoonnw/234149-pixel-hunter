import Application from './../application.js';

export default class BackToIntro {
  constructor() {
  }

  set element(element) {
    this._element = element;
  }

  bind() {
    this.arrow = this._element.querySelector(`button.back`);
    this.onArrowClick = (evt) => {
      evt.preventDefault();
      this.onClick();
      Application.showIntro();
    };

    this.arrow.addEventListener(`click`, this.onArrowClick);
  }

  unbind() {
    this.arrow.removeEventListener(`click`, this.onArrowClick);
  }

  onClick() {
  }
}
