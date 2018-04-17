import RulesView from './rules-view.js';
import render from '../../utils/render-screen';

export default class RulesPresentr {
  init() {
    this.view = new RulesView();
    this.view.onClick = () => console.log(`click`);

    render(this.view.element);
  }
}
