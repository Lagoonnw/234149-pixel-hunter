import {TimerBreakPoints, Time, AnswerType} from "./game-config.js";

export default class Answer {
  constructor(isCorrect, time) {
    this.correct = isCorrect;
    this.time = (time) ? time : Time.MAX;
    this.type = this._setType();
  }

  _setType() {
    if (!this.correct) {
      return AnswerType.WRONG;
    }
    if (this.time > TimerBreakPoints.FAST) {
      return AnswerType.FAST;
    } else if (this.time < TimerBreakPoints.SLOW) {
      return AnswerType.SLOW;
    } else {
      return AnswerType.CORRECT;
    }
  }
}
