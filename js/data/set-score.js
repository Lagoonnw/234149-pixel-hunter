import {TOTAL_ANSWERS, Lives, Point} from './game-config.js';

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

  const points = answers.reduce((sum, it) => {
    if (it.correct && it.type === `correct`) {
      return sum + Point.UNIT;
    }
    if (it.correct && it.type === `fast`) {
      return sum + Point.UNIT + Point.RANGE;
    }
    if (it.correct && it.type === `slow`) {
      return sum + Point.UNIT - Point.RANGE;
    }
    return sum;
  }, 0);

  return points + lives * Point.RANGE;
};

export default setGamePoints;
