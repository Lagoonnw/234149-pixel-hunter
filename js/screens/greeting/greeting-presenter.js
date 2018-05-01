import GreetingView from './greeting-view.js';
import render from '../../utils/render-screen.js';
import Application from '../../application.js';

export default class GreetingPresenter {
  init() {
    this.view = new GreetingView();
    this.view.onClick = () => Application.showRules();

    render(this.view.element);
  }
}
