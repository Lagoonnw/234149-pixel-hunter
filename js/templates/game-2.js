import {dimentions} from "../data/game-config.js";
import getHeader from "./header.js";
import {footer} from "./footer.js";
import renderStatsBar from "./stats-bar.js";

export const getGameTwoTemplate = (state) => {
  const header = getHeader(state);
  const stats = renderStatsBar(state.userAnswers);

  return `${header}\n
  <div class="game">
    <p class="game__task">${state.questions[state.level].title}</p>
    <form class="game__content  game__content--wide">
      ${state.questions[state.level].options.map((option, i) => {
      return `<div class="game__option">
        <img src="${option.url}" alt="Option ${i + 1}" width="" height="">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;   
      }).join(``)}
    </form>
    ${stats}\n
    </div>
    ${footer}`;
};

