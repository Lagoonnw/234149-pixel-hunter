const TOTAL_ANSWERS = 10;
const LifeNumber = {
  max: 3,
  min: 0
};
const POINT = {
  UNIT: 100,
  RANGE: 50
};

const setGamePoints = (answers = [], lifeNumber = LifeNumber.min) => {
  if (lifeNumber < LifeNumber.min || lifeNumber > LifeNumber.max) {
    throw new RangeError(`lifeNumber should be in range from 0 to 3`);
  }
  if (typeof lifeNumber !== `number`) {
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
      return sum + POINT.UNIT;
    }
    if (answer.correct && answer.time <= 10) {
      return sum + POINT.RANGE;
    }
    if (answer.correct && answer.time >= 20) {
      return sum - POINT.RANGE;
    }
    return sum;
  }, 0);

  const score = points + lifeNumber * POINT.RANGE;

  return score;
};

export default setGamePoints;
