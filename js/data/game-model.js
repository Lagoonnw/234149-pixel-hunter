import {Lives, TOTAL_ANSWERS, INITIAL_STATE} from "./game-config";

export default class GameModel {
  constructor(userName = null) {
    this.userName = userName;
    this.listners = new Set();
    this._falseAnswers = 0;
    this._latestGameIndex = 2;
  }

  restart() {
    this.state = Object.assign({}, INITIAL_STATE);
    this.state.statistics = [];
    this.userName = null;
  }

  updateLevel() {
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
    this.checkLives(answer);
    this.updateLevel();
    this.notifyAll();
  }

  subscribe(listener) {
    this.listners.add(listener);
  }

  notifyAll() {
    for (const listener of this.listners) {
      listener(this.state);
    }
  }

  checkLives(answer) {
    if (!answer.correct && this.state.lives > Lives.MIN) {
      return --this.state.lives;
    }
    return this.state.lives;
  }
}
