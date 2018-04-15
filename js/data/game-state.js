import {Lives, TOTAL_ANSWERS} from "./game-config";

export class GameState {
  constructor(state) {
    if (!state) {
      throw new Error(`State object must be passed to this class constructor`);
    }
    this.statistics = state.statistics;
    this.lives = state.lives;
    this.level = state.level;
    this.userName = state.userName;
    this.questions = state.questions;

    this._falseAnswers = 0;
  }

  set newUserName(name) {
    this.userName = name;
  }

  get _livesNumber() {
    return this.lives;
  }

  nextLevel() {
    if (this._falseAnswers > Lives.MAX) {
      return -1;
    }
    if (this.statistics.length === TOTAL_ANSWERS) {
      return -1;
    }
    if (this.statistics.length === 0) {
      return this.level;
    }
    return this.level++;
  }

  addAnswer(answer) {
    if (!answer.correct) {
      this._falseAnswers = ++this._falseAnswers;
    }
    this.statistics.push(answer);
    this._checkLives(answer);
  }

  _checkLives(answer) {
    if (!answer.correct && this.lives > Lives.MIN) {
      return --this.lives;
    }
    return this.lives;
  }
}
