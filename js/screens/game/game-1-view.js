import AbstractView from '../../abstract-view.js';
import {footer} from '../../templates/footer';
import StatusBarView from '../../templates/stats-bar.js';
import getHeader from '../../templates/header.js';
import BackToIntro from '../../utils/back-to-intro.js';
import timerHandler from '../../utils/timer-handler.js';

export default class GameOneView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = getHeader(this.state);
    this.stats = new StatusBarView(this.state.statistics).template;
    this.backToIntro = new BackToIntro();
  }

  get template() {
    this._template = `${this.header}\n<div class="game">
    <p class="game__task">${this.state.questions[this.state.level].question}</p>
    <form class="game__content">
    ${this.state.questions[this.state.level].options.map((option, i) => {
    return `<div class="game__option">
      <img src="${option.url}" 
      alt="Option ${i + 1}" 
      width="${option.size.width}" 
      height="${option.size.height}">
      <label class="game__answer game__answer--photo">
        <input name="question${i + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${i + 1}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
      </div>`;
  }).join(``)}\n
    </form>${this.stats}\n</div>${footer}`;

    return this._template;
  }

  bind() {
    this.backToIntro.element = this.element;
    this.form = this.element.querySelector(`form`);
    this.onFormChange = () => {
      const isFirstOptionChecked = this.form.querySelector(`form [name=question1]:checked`) !== null;
      const isSecondOptionChecked = this.form.querySelector(`form [name=question2]:checked`) !== null;

      if (isFirstOptionChecked && isSecondOptionChecked) {
        const firstOption = this.form.querySelector(`form [name=question1]:checked`).value.trim();
        const secondOption = this.form.querySelector(`form [name=question2]:checked`).value.trim();
        this.onAnswer(firstOption, secondOption);
      }
    };

    this.form.addEventListener(`change`, this.onFormChange);
    this.backToIntro.bind();
  }

  unbind() {
    this.form.removeEventListener(`change`, this.onFormChange);
    this.backToIntro.unbind();
  }

  updateTimer(value) {
    const timer = this.element.querySelector(`.game__timer`);
    timerHandler(value, timer);
  }

  onAnswer() {
  }
}
