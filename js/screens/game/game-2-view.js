import AbstractView from '../../abstract-view.js';
import {footer} from '../../templates/footer';
import getHeader from '../../templates/header.js';
import StatusBarView from '../../templates/stats-bar.js';
import BackToIntro from "../../utils/back-to-intro.js";
import timerHandler from "../../utils/timer-handler";

export default class GameTwoView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = getHeader(this.state);
    this.stats = new StatusBarView(this.state.statistics).template;
    this.backToIntro = new BackToIntro();
  }

  get template() {
    this._template = `
    ${this.header}\n
    <div class="game">
      <p class="game__task">${this.state.questions[this.state.level].question}</p>
    <form class="game__content  game__content--wide">
    ${this.state.questions[this.state.level].options.map((option, i) => {
    i += 1;
    return `<div class="game__option">
      <img data-src="${option.url}" alt="Option ${i}" 
      width="${option.size.width}" 
      height="${option.size.height}">
      <label class="game__answer  game__answer--photo">
        <input name="question${i}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question${i}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`;
  }).join(``)}
    </form>${this.stats}\n</div>${footer}`;

    return this._template;
  }

  bind() {
    this.backToIntro.element = this.element;
    this.form = this.element.querySelector(`form`);
    this.onFormChange = () => {
      const isOptionChecked = this.form.querySelector(`form [name=question1]:checked`) !== null;

      if (isOptionChecked) {
        const optionValue = this.form.querySelector(`form [name=question1]:checked`).value.trim();
        this.onAnswer(optionValue);
      }
    };

    this.form.addEventListener(`change`, this.onFormChange);
    this.backToIntro.bind();
  }

  onAnswer() {
  }

  unbind() {
    this.form.removeEventListener(`change`, this.onFormChange);
    this.backToIntro.unbind();
  }

  updateTimer(value) {
    const timer = this.element.querySelector(`.game__timer`);
    timerHandler(value, timer);
  }

}
