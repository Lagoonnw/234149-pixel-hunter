import {assert} from 'chai';
import setGamePoints from './set-score.js';

const defaultCorrectAnswer = {
  correct: true,
  time: 15
};
const defaultIncorrectAnswer = {
  correct: false,
  time: 15
};
const correctFastAnswer = {
  correct: true,
  time: 5
};
const correctSlowAnswer = {
  correct: true,
  time: 25
};
let lives = 2;

const testWithIncorrectData = (errorMessage, fn, fnArgs) => {
  const [firstArg, secondArg] = fnArgs;
  const regExp = new RegExp(errorMessage);
  assert.throws(() => fn(firstArg, secondArg), regExp);
};

describe(`Game setting score`, () => {
  describe(`Check incorrect data`, () => {
    it(`should not allow set not an array`, () => {
      testWithIncorrectData(`Answers should be an array`, setGamePoints, [{}, lives]);
    });
    it(`should not allow set anything but type of number as lifeNumber`, () => {
      lives = `3`;
      testWithIncorrectData(`lifeNumber should be a type of number`, setGamePoints, [[], lives]);
    });
    it(`should not allow set negative life numbers`, () => {
      lives = -1;
      testWithIncorrectData(`lifeNumber should be in range from 0 to 3`, setGamePoints, [[], lives]);
    });
    it(`should not allow set life numbers more then 3`, () => {
      lives = 8;
      testWithIncorrectData(`lifeNumber should be in range from 0 to 3`, setGamePoints, [[], lives]);
    });
  });

  describe(`Check calculating score`, () => {
    it(`should return -1 when answers.length less then 10`, () => {
      lives = 3;
      assert.equal(-1, setGamePoints([], lives));
    });
    it(`should return 1150 if all answer are correct with normal speed, with all saved lives`, () => {
      const answers = new Array(10).fill(defaultCorrectAnswer);
      assert.equal(1150, setGamePoints(answers, lives));
    });
    it(`should return 1000 if 9 answers are correct: 1 is slow, 1 is fast, with 2 saved lives`, () => {
      lives = 2;
      const answers = new Array(7).fill(defaultCorrectAnswer);
      answers.push(correctFastAnswer);
      answers.push(correctSlowAnswer);
      answers.push(defaultIncorrectAnswer);
      assert.equal(1000, setGamePoints(answers, lives));
    });
  });
});
