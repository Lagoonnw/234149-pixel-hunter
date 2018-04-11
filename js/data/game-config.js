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
  answers: [],
  lives: Lives.MAX,
  time: Time.MIN
};

export const defaultAnwer = {
  correct: false,
  time: Time.MAX
};
export const currentGameState = {
  answers: initialState.answers,
  lives: 3,
  time: initialState.level
};
