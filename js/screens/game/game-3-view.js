import AbstractView from '../../abstract-view.js';
import scaleImg from '../../utils/scale-images';
import {dimentions} from '../../data/game-config';
import {footer} from '../../templates/footer';
import getHeader from '../../templates/header.js';
import StatusBarView from '../../templates/stats-bar.js';

export default class GameThreeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = getHeader(this.state);
    this.stats = new StatusBarView(this.state).template;
  }

  get template() {
    this._template = `${this.header}\n
    <div class="game">
    <p class="game__task">${this.state.questions[this.state.level].title}</p>
    <form class="game__content  game__content--triple">
      ${this.state.questions[this.state.level].options.map((option, i) => {
      return `<div class="game__option">
                <img src="${option.url}" alt="Option ${i + 1}" 
                width="${scaleImg(dimentions.get(`triple`), option.size).width}" 
                height="${scaleImg(dimentions.get(`triple`), option.size).height}">
              </div>`;
      }).join(``)}
    </form>
    ${this.stats}
    </div>
    ${footer}`;

    return this._template;
  }

  bind() {
    this.options = Array.from(this.element.querySelectorAll(`.game__option`));
    this.onOptionClick = (evt) => {
      evt.preventDefault();
      const _el = evt.target;
      this.onAnswer(this.options.indexOf(_el));
    }

    for  (const option of this.options) {
      option.addEventListener(`click`, this.onOptionClick);
    }
  }

  unbind() {
    for  (const option of this.options) {
      option.removeEventListener(`click`, this.onOptionClick);
    }
  }

  onAnswer() {
  }
}
