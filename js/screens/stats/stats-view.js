import AbstractView from '../../abstract-view.js';
import {footer} from '../../templates/footer';
import StatusBarView from '../../templates/stats-bar.js';
import {Lives, Point, TimerBreakPoints, TOTAL_ANSWERS} from '../../data/game-config.js';
import setScore from "../../data/set-score";
import BackToIntro from "../../utils/back-to-intro.js";

export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.stats = new StatusBarView(this.state).template;

    this._ZERO = 0;
    this._wrongAnswersNumber = state.statistics.filter((answer) => !answer.correct).length;
    this._slowAnswersNumber = state.statistics.filter((answer) => answer.time > TimerBreakPoints.SLOW).length;
    this._fastAnswersNumber = state.statistics.filter((answer) => answer.time < TimerBreakPoints.FAST).length;
    this._correctAnswersNumber = state.statistics.filter((answer) => answer.correct).length;
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
      <div class="result">
      <h1>${this.isItVictory()}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">${this.stats}</td>
            ${this.renderTotal()}\n
          </tr>
          ${this.renderDetails()}\n     
          ${this.renderTotalFinal()}\n
        </table>
        ${footer}\n
      </div>`;

    return this._template;
  }

  bind() {
    this.backToIntro = new BackToIntro(this.element);
    this.backToIntro.bind();
  }

  unbind() {
    this.backToIntro.unbind();
  }

  isItVictory() {
    if (this._wrongAnswersNumber > Lives.MAX) {
      return `Fail`;
    }
    if (this.state.statistics.length < TOTAL_ANSWERS) {
      return `Fail`;
    }
    return `Победа!`;
  };

  renderTotal() {
    if (this._wrongAnswersNumber > Lives.MAX || this.state.statistics.length < TOTAL_ANSWERS) {
      return `
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
      `;
    }

    return `
      <td class="result__points">×&nbsp;${Point.UNIT}</td>
      <td class="result__total">${this._correctAnswersNumber * Point.UNIT}</td>
    `;
  };

  renderTotalFinal() {
    if (this._wrongAnswersNumber > Lives.MAX) {
      return ``;
    }
    if (this.state.statistics.length < TOTAL_ANSWERS) {
      return ``;
    }

    return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${setScore(this.state.statistics, this.state.lives)}</td>
      </tr>
    `;
  };

  renderBonusForLives() {
    if (this.state.lives === Lives.MIN) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.state.lives}\&nbsp;\<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">${this.state.lives * Point.RANGE}</td>
      </tr>`;
  };

  renderBonusForFastAnswers() {
    if (this._fastAnswersNumber === this._ZERO) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this._fastAnswersNumber}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">${this._fastAnswersNumber * Point.RANGE}</td>
      </tr>`;
  };

  renderMulctForSlowAnswers() {
    if (this._slowAnswersNumber === this._ZERO) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this._slowAnswersNumber}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">-${this._slowAnswersNumber * Point.RANGE}</td>
      </tr>`;
  };

  renderDetails() {
    if (this.state.statistics.length < TOTAL_ANSWERS) {
      return ``;
    }

    if (this._wrongAnswersNumber > Lives.MAX) {
      return ``;
    }

    return `
      ${this.renderBonusForFastAnswers()}\n
      ${this.renderBonusForLives()}\n
      ${this.renderMulctForSlowAnswers()}\n
    `;
  };
}
