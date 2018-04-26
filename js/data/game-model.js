import {Lives, TOTAL_ANSWERS, initialState} from "./game-config";

export default class GameModel {
  constructor(userName = null) {
    this.userName = userName;
    this.listners = new Set();

    this._falseAnswers = 0;
    this._latestGameIndex = 2;
  }

  _updateLevel() {
    if (this._falseAnswers > Lives.MAX) {
      this.state.level = -1;
      return this.state.level;
    }
    if (this.state.statistics.length === TOTAL_ANSWERS) {
      this.state.level = -1;
      return this.state.level;
    }
    if (this.state.statistics.length === 0) {
      return this.state.level;
    }
    return this.state.level++;
  }

  addAnswer(answer) {
    if (!answer.correct) {
      this._falseAnswers = ++this._falseAnswers;
    }
    this.state.statistics.push(answer);
    this._checkLives(answer);
    this._updateLevel();
    this._notifyAll();
  }

  subscribe(listener) {
    this.listners.add(listener);
  }

  _notifyAll() {
    for (const listener of this.listners) {
      listener(this.state);
    }
  }

  _checkLives(answer) {
    if (!answer.correct && this.state.lives > Lives.MIN) {
      return --this.state.lives;
    }
    return this.state.lives;
  }

  restart() {
    this.state = Object.assign({}, initialState);
    this.state.statistics = [];
  }
}
