import RulesView from './rules-view.js';
import render from '../../utils/render-screen';
import State from '../../data/game-state.js';
import {initialState} from '../../data/data.js';
import GamePresentr from "../game/game-presentr.js";

export default class RulesPresentr {
  init() {
    this.state = new State(initialState);
    this.view = new RulesView();
    this.view.onClick = () => onSubmitBtnClick();

    const game = new GamePresentr(this.state);
    const input = this.view.element.querySelector(`input`);

    const onSubmitBtnClick = () => {
      this.state.userName = String.raw`${input.value.trim()}`;
      console.log(`state`, this.state);
      this.view.unbind();
      game.init();
    };

    render(this.view.element);
  }
}
