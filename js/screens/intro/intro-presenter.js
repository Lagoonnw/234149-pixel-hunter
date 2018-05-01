import IntroView from './intro-view.js';
import render from '../../utils/render-screen.js';

export default class IntroPresenter {
  init() {
    this.view = new IntroView();
    render(this.view.element);
  }

  stop() {
    this.view.fade();
  }
}
