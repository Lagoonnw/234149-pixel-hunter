import {Lives, TOTAL_ANSWERS} from "./game-config";

export default class GameState {
  constructor(state) {
    if (!state) {
      throw new Error(`State object must be passed to this class constructor`);
    }
    this.listners = new Set();
    this.statistics = state.statistics;
    this.lives = state.lives;
    this.level = state.level;
    this.userName = state.userName;
    this.questions = state.questions;

    this._falseAnswers = 0;
  }

  set user(name) {
    this.userName = name;
  }

  get livesNumber() {
    return this.lives;
  }

  nextLevel() {
    if (this._falseAnswers > Lives.MAX) {
      this.level = -1;
      return this.level;
    }
    if (this.statistics.length === TOTAL_ANSWERS) {
      this.level = -1;
      return this.level;
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
    this.checkLives(answer);
    this.nextLevel();
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
    if (!answer.correct && this.lives > Lives.MIN) {
      return --this.lives;
    }
    return this.lives;
  }
}
