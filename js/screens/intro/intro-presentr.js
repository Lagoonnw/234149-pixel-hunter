import IntroView from './intro-view.js';
import render from '../../utils/render-screen.js';
import GreetingPresentr from '../greeting/greeting-presentr.js';

export default class IntroPresentr {
  init() {
    this.view = new IntroView();
    this.view.onClick = () => greeting.init();
    const greeting = new GreetingPresentr();

    render(this.view.element);
  }
}
