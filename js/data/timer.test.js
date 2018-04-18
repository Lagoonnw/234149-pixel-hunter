import {assert} from 'chai';
import Timer from './timer.js';

const time = 3;
const timer = new Timer(time);

const testTimerWithIncorrectData = (errorMessage, value) => {
  const timeValue = value;
  const regExp = new RegExp(errorMessage);

  assert.throws(() => new Timer(timeValue), regExp);
};

describe(`Timer test`, () => {
  describe(`Test incorrect data`, () => {
    it(`should throw an error if time is not a type of number`, () => {
      const strokeTime = `2`;
      testTimerWithIncorrectData(`time should be a type of number`, strokeTime);
    });
    it(`should throw an error if time is a negative number`, () => {
      const negativeTime = -5;
      testTimerWithIncorrectData(`time should be a positive number`, negativeTime);
    });
  });
  describe(`Test timer logic`, () => {
    it(`should tick once from 3 to 2`, () => {
      assert.equal(2, timer._tick());
    });
    it(`should tick once from 2 to 1`, () => {
      assert.equal(1, timer._tick());
    });
    it(`should tick once from 1 to 0`, () => {
      assert.equal(`time is up!`, timer._tick());
    });
  });
});
