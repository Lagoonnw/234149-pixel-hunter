import GameOneView from './game-1-view.js';
import GameTwoView from './game-2-view.js';
import render from '../../utils/render-screen.js';
import {GameTypes} from '../../data/game-config.js';
import {Answer} from '../../data/answer.js';


export default class GamePresentr {
  constructor() {
    this.views = {
      [GameTypes.single]: GameTwoView,
      [GameTypes.double]: GameOneView
    };
  }
  init(state) {
    this.state = state;
    this.view = this.createView(state);
    this.show();
    this.state.subscribe(() => {
      this.changeScreen(this.state);
    });

    const checkAnswer = (value, answer) => value === answer;


    this.view.onAnswer = (firstValue, secondValue) => {
      const [firstAnswer, secondAnswer] = this.state.questions[this.state.level].answers;
      const isFirstAnswerCorrect = checkAnswer(firstValue, firstAnswer);
      const isSecondAnswerCorrect = checkAnswer(secondValue, secondAnswer);

      const answer = new Answer((isFirstAnswerCorrect && isSecondAnswerCorrect), 15);
      this.state.addAnswer(answer);

      console.log(firstValue, secondValue);
    }
  }

  createView(state) {
    if (this.view) {
      this.view.unbind();
    }
    this.view = new this.views[state.questions[state.level].type](state);
    return this.view;
  }

  show() {
    render(this.view.element);
  }

  changeScreen(state) {
    this.view = this.createView(state);
    this.show();
  }
}
