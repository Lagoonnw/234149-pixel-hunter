import GameOneView from './game-1-view.js';
import GameTwoView from './game-2-view.js';
import GameThreeView from './game-3-view.js';
import render from '../../utils/render-screen.js';
import {GameTypes, AnswerType} from '../../data/game-config.js';
import Answer from '../../data/answer.js';
import {Time} from '../../data/game-config.js';
import Timer from '../../data/timer.js';
import Application from '../../application.js';

export default class GamePresentr {
  constructor(model) {
    this.model = model;
    this.views = {
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
    this.view = this._createView(this.state);
    this._showView();
    this._startTimer();
    this.model.subscribe(() => {
      if (this.state.level === this._die) {
        const result = {
          userName: this.model.userName,
          statistics: this.model.state.statistics,
          lives: this.model.state.lives
        };
        this._stopTimer();
        Application.sendResultToServer(result)
            .then(() => Application.showStatistics(this.model.userName))
            .catch(() => `Что-то пошло не так`);
      } else {
        this._changeScreen(this.state);
      }
    });
  }

  _createView(state) {
    if (this.view) {
      this.view.unbind();
    }
    this.view = new this.Views[state.questions[state.level].type](state);
    this._setOnAnswerMethod(state);
    this.view.backToIntro.onClick = () => {
      this._stopTimer();
    };

    return this.view;
  }

  _setOnAnswerMethod(state) {
    this.view.onAnswer = (...args) => {
      let isAnswerCorrect = () => null;

      if (state.questions[state.level].type === GameTypes.single) {
        isAnswerCorrect = this._checkOneOption(...args);
      }
      if (state.questions[state.level].type === GameTypes.double) {
        isAnswerCorrect = this._checkTwoOptions(...args);
      }
      if (state.questions[state.level].type === GameTypes.triple) {
        isAnswerCorrect = this._checkThreeOptions(...args);
      }
      this._stopTimer();
      const answer = new Answer(isAnswerCorrect, this.timer.time);
      this.model.addAnswer(answer);
    };
  }

  _showView() {
    render(this.view.element);
  }

  _changeScreen(state) {
    this.view = this._createView(state);
    this._showView();
    this.timer.clear();
    this._startTimer();
  }

  _checkAnswer(value, answer) {
    return value === answer;
  }

  _checkTwoOptions(firstValue, secondValue) {
    const [firstAnswer, secondAnswer] = this.state.questions[this.state.level].answers;
    const isFirstAnswerCorrect = this._checkAnswer(firstValue, firstAnswer);
    const isSecondAnswerCorrect = this._checkAnswer(secondValue, secondAnswer);

    return isFirstAnswerCorrect && isSecondAnswerCorrect;
  }

  _checkOneOption(value) {
    const [answer] = this.state.questions[this.state.level].answers;
    return this._checkAnswer(value, answer);
  }

  _checkThreeOptions(value) {
    const task = (this.state.questions[this.state.level].question.split(` `)[1] === `фото`) ?
      AnswerType.PHOTO : AnswerType.PAINTING;

    return this._checkAnswer(value, task);
  }

  _pushWrongAnswer() {
    const answer = new Answer(false, this.timer.time);
    this.model.addAnswer(answer);
  }

  _startTimer() {
    this._timer = setInterval(() => {
      this.timer.tick();
      this.view.updateTimer(this.timer.time);
      if (this.timer.time <= this.timer.zero) {
        this._stopTimer();
        this._pushWrongAnswer();
      }
    }, this._interval);
  }

  _stopTimer() {
    clearInterval(this._timer);
  }
}
