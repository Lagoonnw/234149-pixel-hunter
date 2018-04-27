import AbstractView from '../../abstract-view.js';
import {footer} from '../../templates/footer';
import StatusBarView from '../../templates/stats-bar.js';
import {Lives, Point, TOTAL_ANSWERS} from '../../data/game-config.js';
import setScore from "../../data/set-score";
import BackToIntro from "../../utils/back-to-intro.js";

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    this.backToIntro = new BackToIntro();

    this._ZERO = 0;
    this._currentGameIndex = 0;
    this._wrongAnswersNumber = this.results[0].statistics.filter((answer) => !answer.correct).length;
    this._currentGameAnswersLength = this.results[0].statistics.length;
  }

  get template() {
    this._template = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    </header>
    <div class="result">
    <h1>${this._isItVictory()}</h1>
    <table class="result__table">
    ${this.results.map((it, i) => {
    const stats = new StatusBarView(it.statistics).template;
    const wrongAnswersNumber = it.statistics.filter((answer) => !answer.correct).length;
    const slowAnswersNumber = it.statistics.filter((answer) => answer.type === `slow`).length;
    const fastAnswersNumber = it.statistics.filter((answer) => answer.type === `fast`).length;
    const correctAnswersNumber = it.statistics.filter((answer) => answer.correct).length;

    return `<tr><td class="result__number">${i + 1}.</td>
    <td colspan="2">${stats}</td>
    ${this._renderTotal(wrongAnswersNumber, correctAnswersNumber, it.statistics.length)}\n
    ${this._renderDetails(it.lives, fastAnswersNumber, slowAnswersNumber, wrongAnswersNumber, it.statistics.length)}\n
    </tr>
      
    ${this._renderTotalFinal(wrongAnswersNumber, it.statistics, it.lives)}`;
  }).join(``)}</table>${footer}\n</div>`;

    return this._template;
  }

  bind() {
    this.backToIntro.element = this.element;
    this.backToIntro.bind();
  }

  unbind() {
    this.backToIntro.unbind();
  }

  _isItVictory() {
    if (this._wrongAnswersNumber > Lives.MAX) {
      return `Fail`;
    }
    if (this._currentGameAnswersLength < TOTAL_ANSWERS) {
      return `Fail`;
    }
    return `Победа!`;
  }

  _renderTotal(wrongAnswers, correctAnswers, length) {
    if (wrongAnswers > Lives.MAX || length < TOTAL_ANSWERS) {
      return `
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
    }

    return `
      <td class="result__points">×&nbsp;${Point.UNIT}</td>
      <td class="result__total">${correctAnswers * Point.UNIT}</td>`;
  }

  _renderTotalFinal(wrongAnswers, answers, lives) {
    if (wrongAnswers > Lives.MAX) {
      return ``;
    }
    if (answers.length < TOTAL_ANSWERS) {
      return ``;
    }

    return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${setScore(answers, lives)}</td>
      </tr>`;
  }

  _renderBonusForLives(lives) {
    if (lives === Lives.MIN) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}\&nbsp;\<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">${lives * Point.RANGE}</td>
      </tr>`;
  }

  _renderBonusForFastAnswers(fastAnswersNumber) {
    if (fastAnswersNumber === this._ZERO) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswersNumber}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">${fastAnswersNumber * Point.RANGE}</td>
      </tr>`;
  }

  _renderMulctForSlowAnswers(slowAnswersNumber) {
    if (slowAnswersNumber === this._ZERO) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersNumber}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">-${slowAnswersNumber * Point.RANGE}</td>
      </tr>`;
  }

  _renderDetails(lives, fastAnswersNumber, slowAnswersNumber, wrongAnswersNumber, length) {
    if (length < TOTAL_ANSWERS) {
      return ``;
    }

    if (wrongAnswersNumber > Lives.MAX) {
      return ``;
    }

    return `
      ${this._renderBonusForFastAnswers(fastAnswersNumber)}\n
      ${this._renderBonusForLives(lives)}\n
      ${this._renderMulctForSlowAnswers(slowAnswersNumber)}\n`;
  }
}
