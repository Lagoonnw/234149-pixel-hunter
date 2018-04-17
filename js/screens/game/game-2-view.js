import AbstractView from '../../abstract-view.js';
import scaleImg from '../../utils/scale-images';
import {dimentions} from '../../data/game-config';
import {footer} from '../../templates/footer';
import getHeader from '../../templates/header.js';
import StatusBarView from '../../templates/stats-bar.js';

export default class GameTwoView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = getHeader(this.state);
    this.stats = new StatusBarView(this.state).template;
  }

  get template() {
    this._template = `
    ${this.header}\n
    <div class="game">
      <p class="game__task">${this.state.questions[state.level].title}</p>
    <form class="game__content  game__content--wide">
      ${this.state.questions[this.state.level].options.map((option, i) => {
      return `<div class="game__option">
        <img src="${option.url}" alt="Option ${i + 1}" 
        width="${scaleImg(dimentions.get(`single`), option.size).width}" 
        height="${scaleImg(dimentions.get(`single`), option.size).height}">
          <label class="game__answer  game__answer--photo">
            <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
    }).join(``)}
    </form>${this.stats}\n</div>${footer}`;

    return this._template;
  }

  bind() {
    this.form = this.element.querySelector(`form`);
    this.onFormChange = (evt) => {
      const isOptionChecked = this.form.querySelector(`form [name=question1]:checked`) !== null;

      if (isOptionChecked) {
        const optionValue = this.form.querySelector(`form [name=question1]:checked`).value.trim();
        this.onAnswer(optionValue);
      }
    }

    this.form.addEventListener(`change`, this.onFormChange);
  }

  onAnswer() {

  }

  unbind() {
    this.form.removeEventListener(`change`, this.onFormChange);
  }
}
