import IntroView from './intro-view.js';
import render from '../../utils/render-screen.js';
import Application from '../../application.js';

export default class IntroPresentr {
  init() {
    this.view = new IntroView();
    this.view.onClick = () => Application.showGreeting();

    render(this.view.element);
  }

  stop() {
    this.view.fade();
  }
}
