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
  it(`should throw an error if time is not a type of number`, () => {
    testTimerWithIncorrectData(`time should be a type of number`, `2`);
  });
  it(`should throw an error if time is a negative number`, () => {
    testTimerWithIncorrectData(`time should be a positive number`, -5);
  });
  it(`should tick once from 3 to 2`, () => {
    assert.equal(2, timer.tick());
  });
  it(`should tick once from 2 to 1`, () => {
    assert.equal(1, timer.tick());
  });
  it(`should tick once from 1 to 0`, () => {
    assert.equal(`time is up!`, timer.tick());
  });
});
