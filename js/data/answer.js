import {TimerBreakPoints, Time} from "./game-config.js";

export class Answer {
  constructor(isCorrect, time) {
    this.correct = (isCorrect) ? isCorrect : false;
    this.time = (time) ? time : Time.MAX;
    this.type = this._setType();
  }

  _setType() {
    if (!this.correct) {
      return `wrong`;
    }
    if (this.time > TimerBreakPoints.FAST) {
      return `fast`;
    } else if (this.time < TimerBreakPoints.SLOW) {
      return `slow`;
    } else {
      return `correct`;
    }
  }
}
