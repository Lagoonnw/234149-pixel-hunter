import GreetingView from './greeting-view.js';
import render from '../../utils/render-screen.js';
import Application from '../../application.js';

export default class GreetingPresentr {
  init() {
    this.view = new GreetingView();
    this.view.onClick = () => Application.showRules();

    render(this.view.element);
  }
}
