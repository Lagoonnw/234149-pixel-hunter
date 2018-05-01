export const APP_ID = 4082007;

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

export const GameTypes = {
  single: `single`,
  double: `double`,
  triple: `triple`
};

export const UserAnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export const AnswerType = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};

export const TotalGameResult = {
  WIN: `Победа!`,
  FAIL: `Fail`
};

export const ServerPaths = {
  DATA: `https://es.dump.academy/pixel-hunter/questions`,
  STATS: `https://es.dump.academy/pixel-hunter/stats/`
};

export const initialState = {
  statistics: [],
  questions: [],
  lives: Lives.MAX,
  level: 0
};

