import {TOTAL_ANSWERS} from './../data/game-config';
import AbstractView from '../abstract-view.js';

export default class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const answers = [];

    this.state.statistics.forEach((it) => {
      answers.push(`<li class="stats__result stats__result--${it.type}"></li>`);
    });

    this._template = `
      <div class="stats">
        <ul class="stats">
          ${answers.join(``)}${new Array(TOTAL_ANSWERS - answers.length)
            .fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
        </ul>
      </div>`;

    return this._template;
  }
}
