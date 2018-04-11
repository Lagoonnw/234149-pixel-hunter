export const getWrongAnswersNumber = (answers) => {
  let number = 0;
  for (const answer of answers) {
    number = (!answer.correct) ? number++ : number;
  }
  return number;
}
