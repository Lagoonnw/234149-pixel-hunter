import GameOneView from './game-1-view.js';
import GameTwoView from './game-2-view.js';
import GameThreeView from './game-3-view.js';
import render from '../../utils/render-screen.js';
import {GameTypes} from '../../data/game-config.js';
import {Answer} from '../../data/answer.js';
import {Time} from '../../data/game-config';
import Timer from '../../data/timer.js';
import Application from "../../application";


export default class GamePresentr {
  constructor(model) {
    this.model = model;
    this.Views = {
      [GameTypes.single]: GameTwoView,
      [GameTypes.double]: GameOneView,
      [GameTypes.triple]: GameThreeView
    };
    this.timer = new Timer(Time.MAX);
    this._die = -1;
    this._interval = 1000;
  }

  init() {
    this.model.restart();
    this.state = this.model.state;
    this.view = this.createView(this.state);
    this.show();
    this.startTimer();

    this.model.subscribe(() => {
      if (this.state.level === this._die) {
        this.stopTimer();
        Application.showStatistics(this.model);
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
    this.setOnAnswerMethod(state);

    this.view.backToIntro.onClick = () => {
      this.stopTimer();
    };

    return this.view;
  }

  setOnAnswerMethod(state) {
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

      this.stopTimer();
      const answer = new Answer(isAnswerCorrect, this.timer.time);
      this.model.addAnswer(answer);
    };
  }

  show() {
    render(this.view.element);
  }

  changeScreen(state) {
    this.view = this.createView(state);
    this.show();
    this.timer.clear();
    this.startTimer();
  }

  checkAnswer(value, answer) {
    return value === answer;
  }

  checkTwoOptions(firstValue, secondValue) {
    const [firstAnswer, secondAnswer] = this.state.questions[this.state.level].answers;
    const isFirstAnswerCorrect = this.checkAnswer(firstValue, firstAnswer);
    const isSecondAnswerCorrect = this.checkAnswer(secondValue, secondAnswer);

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

  pushWrongAnswer() {
    const answer = new Answer(false, this.timer.time);
    this.model.addAnswer(answer);
  }

  startTimer() {
    this._timer = setInterval(() => {
      this.timer.tick();
      this.view.updateTimer(this.timer.time);
      if (this.timer.time <= this.timer.zero) {
        this.stopTimer();
        this.pushWrongAnswer();
      }
    }, this._interval);
  }

  stopTimer() {
    clearInterval(this._timer);
  }
}
