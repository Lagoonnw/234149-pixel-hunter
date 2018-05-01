import StatsView from './stats-view.js';
import render from '../../utils/render-screen.js';

export default class StatsPresenter {
  constructor(data) {
    this.results = data;
  }

  init() {
    this.results.reverse();
    this.view = new StatsView(this.results);
    render(this.view.element);
  }
}
