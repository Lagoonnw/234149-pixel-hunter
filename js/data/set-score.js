import {TOTAL_ANSWERS, Lives, Point, TimerBreakPoints} from './game-config.js';

const setGamePoints = (answers = [], lives = Lives.MIN) => {
  if (lives < Lives.MIN || lives > Lives.MAX) {
    throw new RangeError(`lifeNumber should be in range from 0 to 3`);
  }
  if (typeof lives !== `number`) {
    throw new TypeError(`lifeNumber should be a type of number`);
  }
  if (!Array.isArray(answers)) {
    throw new TypeError(`Answers should be an array`);
  }
  if (answers.length < TOTAL_ANSWERS) {
    return -1;
  }

  const points = answers.reduce((sum, answer) => {
    if (answer.correct) {
      return sum + Point.UNIT;
    }
    if (answer.correct && answer.time <= TimerBreakPoints.FAST) {
      return sum + Point.RANGE;
    }
    if (answer.correct && answer.time >= TimerBreakPoints.SLOW) {
      return sum - Point.RANGE;
    }
    return sum;
  }, 0);

  const score = points + lives * Point.RANGE;

  return score;
};

export default setGamePoints;
