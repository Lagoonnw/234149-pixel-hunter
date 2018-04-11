import {Lives} from "./game-config";
import {questions} from "./data.js";

export const initialState = {
  questions: questions,
  userAnswers: [],
  lives: Lives.MAX,
  level: 0,
  userName: null
};

export class GameState {
  constructor(state) {
    if(!state) {
      throw new Error(`State object must be passed to this class constructor`);
    }
    this.userAnswers = state.userAnswers;
    this.lives = state.lives;
    this.level = state.level;
    this.userName = state.userName;
    this.questions = state.questions;
  }

  nextLevel() {
    return ++this.level;
  }

  addAnswer(answer) {
    this.userAnswers.push(answer);
  }

  setUserName(name) {
    if (typeof name !== `string`) {
      throw new TypeError(`User name must be a type of string`);
    }
    this.userName = name;
  }
};
