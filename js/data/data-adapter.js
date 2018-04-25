import {GameTypes} from "./game-config.js";

const AnswerTypeMapper = {
  [`two-of-two`]: GameTypes.double,
  [`tinder-like`]: GameTypes.single,
  [`one-of-three`]: GameTypes.triple
};

const preprocessAnswersToOptions = (answers) => answers.map((answer) => {
  return {
    url: answer.image.url,
    size: answer.image.size
  };
});

const preprocessAnswers = (answers) => answers.map((answer) => answer.type);

const preprocessQuestionType = (type) => AnswerTypeMapper[type];

export const adaptData = (data) => {
  for (const level of Object.values(data)) {
    level.type = preprocessQuestionType(level.type);
    level.options = preprocessAnswersToOptions(level.answers);
    level.answers = preprocessAnswers(level.answers);
  }
  return data;
};
