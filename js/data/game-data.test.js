import {assert} from 'chai';
import {setGamePoints} from './game.js';

const testWithIncorrectData = (errorMessage, fn, fnArgs) => {
  const [firstArg, secondArg] = fnArgs;
  const regExp = new RegExp(errorMessage);

  assert.throws(() => fn(firstArg, secondArg), regExp);
};

describe(`Game setting score`, () => {
  describe(`Check incorrect data`, () => {
    it(`should return -1 when answers.length less then 10`, () => {
      assert.equal(-1, setGamePoints([], 3));
    });
    it(`should not allow set not an array`, () => {
      testWithIncorrectData(`Answers should be an array`, setGamePoints, [{}, 2]);
    });
    it(`should not allow set anything but number as life numbers`, () => {
      testWithIncorrectData(`lifeNumber should be a type of number`, setGamePoints, [[], `3`]);
    });
    it(`should not allow set negative life numbers`, () => {
      testWithIncorrectData(`lifeNumber should be positive`, setGamePoints, [[], -1]);
    });
  });

  describe(`Check calculating score`, () => {
    it(`should return 1150 if all answer correct, not fast, not slow, with all saved lives`, () => {
      assert.equal(1150, setGamePoints([{correct: true, time: 15}, {correct: true, time: 15}, {correct: true, time: 15},
        {correct: true, time: 15}, {correct: true, time: 15}, {correct: true, time: 15}, {correct: true, time: 15},
        {correct: true, time: 15}, {correct: true, time: 15}, {correct: true, time: 15}], 3));
    });
  });

});
