import GameOneView from './game-1-view.js';
import GameTwoView from './game-2-view.js';
import GameThreeView from './game-3-view.js';
import StatsPresentr from '../stats/stats-presentr.js';
import render from '../../utils/render-screen.js';
import {GameTypes} from '../../data/game-config.js';
import {Answer} from '../../data/answer.js';


export default class GamePresentr {
  constructor() {
    this.Views = {
      [GameTypes.single]: GameTwoView,
      [GameTypes.double]: GameOneView,
      [GameTypes.triple]: GameThreeView
    };
    this._die = -1;
  }

  init(state) {
    this.state = state;
    this.view = this.createView(this.state);
    this.show();

    this.state.subscribe(() => {
      console.log(`stats`,this.state.level === this._die);

      if (this.state.level === this._die) {
        console.log(`stats`,this.state);


        const stats = new StatsPresentr();
        console.log(`statsPR`, stats);
        stats.init(this.state);
      } else {
        this.changeScreen(this.state);
      }



    });

  }

  createView(state) {
    if (this.view) {
      this.view.unbind();
    }
    this.view = new this.Views[state.questions[state.level].type](state);

    this.view.onAnswer = (...args) => {
      let isAnswerCorrect = () => null;

      if (state.questions[state.level].type === GameTypes.single) {
        isAnswerCorrect = this.checkOneOption(...args);
      }
      if (state.questions[state.level].type === GameTypes.double) {
        isAnswerCorrect = this.checkTwoOptions(...args);
      }
      if (state.questions[state.level].type === GameTypes.triple) {
        isAnswerCorrect = this.checkThreeOptions(...args);
      }

      const answer = new Answer(isAnswerCorrect, 15);
      this.state.addAnswer(answer);
    };

    return this.view;
  }

  show() {
    render(this.view.element);
  }

  changeScreen(state) {
    this.view = this.createView(state);
    this.show();
  }

  checkAnswer(value, answer) {
    return value === answer;
  }

  checkTwoOptions(firstValue, secondValue) {
    const [firstAnswer, secondAnswer] = this.state.questions[this.state.level].answers;
    const isFirstAnswerCorrect = this.checkAnswer(firstValue, firstAnswer);
    const isSecondAnswerCorrect = this.checkAnswer(secondValue, secondAnswer);

    console.log(isFirstAnswerCorrect && isSecondAnswerCorrect);

    return isFirstAnswerCorrect && isSecondAnswerCorrect;
  }

  checkOneOption(value) {
    const [answer] = this.state.questions[this.state.level].answers;
    return this.checkAnswer(value, answer);
  }

  checkThreeOptions(index) {
    const answers = this.state.questions[this.state.level].answers;
    return answers[index];
  }
}
