import StatsView from './stats-view.js';
import render from '../../utils/render-screen.js';

export default class StatsPresentr {
  init(state) {
    this.view = new StatsView(state);
    render(this.view.element);
  }
}
