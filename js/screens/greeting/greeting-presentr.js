import GreetingView from './greeting-view.js';
import render from '../../utils/render-screen.js';
import RulesPresentr from '../rules/rules-presentr.js';

export default class GreetingPresentr {
  init() {
    this.view = new GreetingView();
    this.view.onclick = () => rules.init();
    const rules = new RulesPresentr();

    render(this.view.element);
  }
}
