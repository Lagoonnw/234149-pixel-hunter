const TOTAL_ANSWERS = 10;
const LifeNumber = {
  max: 3,
  min: 0
};
const POINT = {
  UNIT: 100,
  RANGE: 50
};

export const setGamePoints = (answers = [], lifeNumber = LifeNumber.max) => {
  let wrongAnswersNumber = 0;
  let fastAnswersNumber = 0;
  let slowAnswersNumber = 0;
  let score = (answers.length - wrongAnswersNumber) * POINT.UNIT + (fastAnswersNumber + lifeNumber) * POINT.RANGE - slowAnswersNumber * POINT.RANGE;

  if (lifeNumber < LifeNumber.min) {
    throw new RangeError(`lifeNumber should be positive`);
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

  for (let answer of answers) {
    if (!answer.correct) {
      wrongAnswersNumber++;
    }
    if (answer.time < 10) {
      fastAnswersNumber++;
    }
    if (answer.time > 20) {
      slowAnswersNumber++;
    }
  }

  return score;
};
