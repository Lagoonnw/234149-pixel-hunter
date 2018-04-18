import IntroPresentr from './../screens/intro/intro-presentr.js';

export default class BackToIntro {
  constructor(element) {
    this.arrow = element.querySelector('button.back');
    this.intro = new IntroPresentr();
  }

  bind() {
    this.onArrowClick = (evt) => {
      evt.preventDefault();
      this.intro.init();
    };

    this.arrow.addEventListener(`click`, this.onArrowClick);
  }

  unbind() {
    this.arrow.removeEventListener(`click`, this.onArrowClick);
  }
}
