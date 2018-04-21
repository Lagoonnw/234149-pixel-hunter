import {TimerBreakPoints} from "./game-config.js";

export class Answer {
  constructor(isCorrect, time) {
    this.correct = (isCorrect) ? isCorrect : false;
    this.time = (time) ? time : 30;
    this.type = this.setType();
  }

  setType() {
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
