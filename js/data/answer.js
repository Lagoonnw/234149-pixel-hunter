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
    if (this.time < 10) {
      return `fast`;
    } else if (this.time > 20) {
      return `slow`;
    } else {
      return `correct`;
    }
  }
}
