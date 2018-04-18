export default class Timer {
  constructor(time) {
    if (typeof time !== `number`) {
      throw new Error(`time should be a type of number`);
    }
    if (time < 0) {
      throw new Error(`time should be a positive number`);
    }

    this.time = time;
    this.finish = `time is up!`;

    this._time = time;
    this._zero = 0;
  }

  get currentTime() {
    return this.time;
  }

  _tick() {
    if (this.time === this.zero) {
      return this.finish;
    }
    this.time--;
    return this.time || this.finish;
  }

  start() {
    this._timer = setInterval(() => {
      this._tick();
      if (this.time === this._zero) {
        this.stop();
      }
      console.log(this.time);
    },1000);
  }

  stop() {
    clearInterval(this._timer);
  }

  clear() {
    this.time = this._time;
  }
}
