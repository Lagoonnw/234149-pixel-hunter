class Timer {
  constructor(time) {
    if (typeof time !== `number`) {
      throw new Error(`time should be a type of number`);
    }
    if (time < 0) {
      throw new Error(`time should be a positive number`);
    }
    this.zero = 0;
    this.time = time;
    this.finish = `time is up!`;
  }

  tick() {
    if (this.time === this.zero) {
      return this.finish;
    }
    this.time--;
    return this.time || this.finish;
  }
}

export default Timer;
