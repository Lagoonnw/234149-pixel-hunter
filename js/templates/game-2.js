import {getScaledSize} from "../utils/get-scaled-image-size.js";
import {renderGameOneTemplate} from "./game-1";
import {dimentions} from "../data/game-config.js";

export const renderGameTwoTemplate = (question) => {
  const [img] = question.options;
  const size = getScaledSize(dimentions.get(`single`), img.size);

  return `
    <p class="game__task">${question.title}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${img.url}" alt="Option 1" width="${size.width}" height="${size.height}">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>`;
};

