const TOTAL_ANSWERS = 10;
const Lives = {
  max: 3,
  min: 0
};
const Point = {
  UNIT: 100,
  RANGE: 50
};
const TimerBreakPoints = {
  fast: 10,
  slow: 20
};

const setGamePoints = (answers = [], lives = Lives.min) => {
  if (lives < Lives.min || lives > Lives.max) {
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
    if (answer.correct && answer.time <= TimerBreakPoints.fast) {
      return sum + Point.RANGE;
    }
    if (answer.correct && answer.time >= TimerBreakPoints.slow) {
      return sum - Point.RANGE;
    }
    return sum;
  }, 0);

  const score = points + lives * Point.RANGE;

  return score;
};

export default setGamePoints;
