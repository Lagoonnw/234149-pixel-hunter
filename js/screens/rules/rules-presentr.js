import RulesView from './rules-view.js';
import render from '../../utils/render-screen';
import Application from "../../application";

export default class RulesPresentr {
  init(model) {
    this.view = new RulesView();
    this.view.onClick = () => onSubmitBtnClick();

    const onSubmitBtnClick = () => {
      const input = this.view.element.querySelector(`input`);
      model.player = String.raw`${input.value.trim()}`;
      this.view.unbind();
      Application.showGame(model);
    };

    render(this.view.element);
  }
}
