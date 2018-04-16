import IntroView from './intro-view.js';
import render from '../../utils/render-screen.js'

export default class IntroPresenter {
  init() {
    this.view = new IntroView();
    this.view.onClick = () => console.log(`yey!`);
    render(this.view.element);
  }
};
