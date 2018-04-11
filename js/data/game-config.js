export const TOTAL_ANSWERS = 10;
export const Time = {
  MIN: 0,
  MAX: 30
};
export const Lives = {
  MAX: 3,
  MIN: 0
};
export const Point = {
  UNIT: 100,
  RANGE: 50
};
export const TimerBreakPoints = {
  FAST: 10,
  SLOW: 20
};
export const initialState = {
  lives: Lives.MAX,
  time: Time.MIN
};
export const answer = {
  set correct(isCorrect) {
    this.isCorrect = isCorrect;
  },
  set time(time) {
    this.newTime = time;
  },
  get correct() {
    return this.isCorrect || false;
  },
  get time() {
    return this.newTime || TimeRanges.MAX;
  },
  get type() {
    if (!this.isCorrect) {
      return `wrong`;
    }
    if (this.newTime < TimerBreakPoints.FAST) {
      return `fast`;
    } else if (this.newTime > TimerBreakPoints.SLOW) {
      return `slow`;
    } else {
      return `correct`;
    }
  }
};
export const images = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};
