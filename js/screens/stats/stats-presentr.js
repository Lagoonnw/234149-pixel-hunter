import StatsView from './stats-view.js';
import render from '../../utils/render-screen.js';

export default class StatsPresentr {
  constructor(model) {
    this.model = model;
    this.results = [model.state];
  }

  init() {
    this.view = new StatsView(this.results);
    render(this.view.element);
  }
}
