import AbstractView from '../../abstract-view.js';
import {footer} from '../../templates/footer';
import getHeader from '../../templates/header.js';
import StatusBarView from '../../templates/stats-bar.js';
import BackToIntro from '../../utils/back-to-intro.js';
import timerHandler from '../../utils/timer-handler.js';

export default class GameThreeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = getHeader(this.state);
    this.stats = new StatusBarView(this.state.statistics).template;
    this.backToIntro = new BackToIntro();
  }

  get template() {
    this._template = `${this.header}\n
    <div class="game">
    <p class="game__task">${this.state.questions[this.state.level].question}</p>
    <form class="game__content  game__content--triple">
    ${this.state.questions[this.state.level].options.map((option, i) => {
    return `
    <div class="game__option">
      <img src="${option.url}" alt="Option ${i + 1}" data-type="${this.state.questions[this.state.level].answers[i]}" 
      width="${option.size.width}" 
      height="${option.size.height}">
    </div>`;
  }).join(``)}
    </form>
    ${this.stats}
    </div>
    ${footer}`;

    return this._template;
  }

  bind() {
    this.backToIntro.element = this.element;
    this.options = Array.from(this.element.querySelectorAll(`.game__option`));
    this.onOptionClick = (evt) => {
      evt.preventDefault();
      const value = evt.target.children[0].dataset.type;
      this.onAnswer(value);
    };

    for (const option of this.options) {
      option.addEventListener(`click`, this.onOptionClick);
    }
    this.backToIntro.bind();
  }

  unbind() {
    for (const option of this.options) {
      option.removeEventListener(`click`, this.onOptionClick);
    }
    this.backToIntro.unbind();
  }

  onAnswer() {
  }

  updateTimer(value) {
    const timer = this.element.querySelector(`.game__timer`);
    timerHandler(value, timer);
  }
}
