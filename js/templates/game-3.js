import {dimentions} from "../data/game-config.js";
import getHeader from "./header.js";
import {footer} from "./footer.js";
import renderStatsBar from "./stats-bar.js";

export const getThreeTemplate = (state) => {
  const header = getHeader(state);
  const stats = renderStatsBar(state.userAnswers);
  return `${header}\n
    <div class="game">
    <p class="game__task">${state.questions[state.level].title}</p>
    <form class="game__content  game__content--triple">
      ${state.questions[state.level].options.map((option, i) => {
        return `<div class="game__option">
                  <img src="${option.url}" alt="Option ${i + 1}" width="" height="">
                </div>`;  
      }).join(``)}
    </form>
      ${stats}
    </div>
    ${footer}`;
};
