import StatsView from './stats-view.js';
import render from '../../utils/render-screen.js';

export default class StatsPresentr {
  init(state) {

    this.view = new StatsView(state);
    console.log(`statestats`, this.view );
    console.log(this.view.template, this.view.element);
    render(this.view.element);
  }
}
