import {TOTAL_ANSWERS} from './../data/game-config';

const renderStatsBar = (answers = []) => {
  const answerTypes = [];

  for (const answer of answers) {
    answerTypes.push(`<li class="stats__result stats__result--${answer.type}"></li>`);
  }

  return `<div class="stats">
    <ul class="stats">
      ${answerTypes.join(``)}
      ${new Array(TOTAL_ANSWERS - answerTypes.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
    </ul>
  </div>`;
};


export default renderStatsBar;
