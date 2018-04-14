import renderStatsBar from './stats-bar.js';
import {footer} from './../templates/footer.js';
import setScore from './../data/set-score.js';
import {Point, TimerBreakPoints, Lives, TOTAL_ANSWERS} from "../data/game-config.js";

export const getStatsTemplate = (state) => {
  const ZERO = 0;
  const stats = renderStatsBar(state.statistics);
  const wrongAnswersNumber = state.statistics.filter((answer) => !answer.correct).length;
  const slowAnswersNumber = state.statistics.filter((answer) => answer.time > TimerBreakPoints.SLOW).length;
  const fastAnswersNumber = state.statistics.filter((answer) => answer.time < TimerBreakPoints.FAST).length;
  const correctAnswersNumber = state.statistics.filter((answer) => answer.correct).length;

  const isItVictory = () => {
    if (wrongAnswersNumber > Lives.MAX) {
      return `Fail`;
    }
    if (state.statistics.length < TOTAL_ANSWERS) {
      return `Fail`;
    }
    return `Победа!`;
  };

  const renderTotal = () => {
    if (wrongAnswersNumber > Lives.MAX || state.statistics.length < TOTAL_ANSWERS) {
      return `
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
      `;
    }

    return `
      <td class="result__points">×&nbsp;${Point.UNIT}</td>
      <td class="result__total">${correctAnswersNumber * Point.UNIT}</td>
    `;
  };

  const renderTotalFinal = () => {
    if (wrongAnswersNumber > Lives.MAX) {
      return ``;
    }
    if (state.statistics.length < TOTAL_ANSWERS) {
      return ``;
    }

    return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${setScore(state.statistics, state.lives)}</td>
      </tr>
    `;
  };

  const renderBonusForLives = () => {
    if (state.lives === Lives.MIN) {
      return ``;
    }
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${state.lives}\&nbsp;\<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Point.RANGE}</td>
        <td class="result__total">${state.lives * Point.RANGE}</td>
      </tr>`;
  };

  const renderBonusForFastAnswers = () => {
    if (fastAnswersNumber === ZERO) {
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
  };

  const renderMulctForSlowAnswers = () => {
    if (slowAnswersNumber === ZERO) {
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
  };

  const renderDetails = () => {
    if (state.statistics.length < TOTAL_ANSWERS) {
      return ``;
    }

    if (wrongAnswersNumber > Lives.MAX) {
      return ``;
    }

    return `
      ${renderBonusForFastAnswers()}\n
      ${renderBonusForLives()}\n
      ${renderMulctForSlowAnswers()}\n
    `;
  };

  return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="result">
    <h1>${isItVictory()}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${stats}\n
        </td>
        ${renderTotal()}\n
      </tr>
      ${renderDetails()}\n     
      ${renderTotalFinal()}\n
    </table>
    ${footer}\n
  </div>`;
};
