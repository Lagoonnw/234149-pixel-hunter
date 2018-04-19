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
  SLOW: 10,
  FAST: 20
};

export const dimentions = new Map()
    .set(`single`, {width: 705, height: 455})
    .set(`double`, {width: 468, height: 458})
    .set(`triple`, {width: 304, height: 455});

export const GameTypes = {
  single: `single`,
  double: `double`,
  triple: `triple`
};

