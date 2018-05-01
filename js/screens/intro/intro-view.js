import AbstractView from "../../abstract-view";
import {footer} from "../../templates/footer.js";

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    this._template = `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>${footer}`;
    return this._template;
  }

  fade() {
    const element = this.element.querySelector(`.intro`);
    element.classList.add(`fade`);
  }
}
