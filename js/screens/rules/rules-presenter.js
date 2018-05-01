import RulesView from './rules-view.js';
import render from '../../utils/render-screen';
import Application from "../../application";

export default class RulesPresenter {
  init() {
    this.view = new RulesView();
    this.view.onClick = () => onSubmitBtnClick();

    const onSubmitBtnClick = () => {
      const input = this.view.element.querySelector(`input`);
      this.view.unbind();
      Application.showGame(String.raw`${input.value.trim()}`);
    };

    render(this.view.element);
  }
}
