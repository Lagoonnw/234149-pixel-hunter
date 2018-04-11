import {questions} from "../data/data.js";

const question = questions[2];
const [optionOne, optionTwo, optionThree] = question.options;

export const gameThreeTemplate = `
    <p class="game__task">${question.title}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${optionOne}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${optionTwo}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${optionThree}" alt="Option 1" width="304" height="455">
      </div>
    </form>`;
