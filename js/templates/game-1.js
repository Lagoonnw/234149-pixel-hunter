import {getScaledSize} from "../utils/get-scaled-image-size.js";
import {dimentions} from "../data/game-config.js";

export const renderGameOneTemplate = (question) => {
  const [optionOne, optionTwo] = question.options;
  const sizeOptionOne = getScaledSize(dimentions.get(`double`), optionOne.size);
  const sizeOptionTwo = getScaledSize(dimentions.get(`double`), optionTwo.size);

  return `
     <p class="game__task">${question.title}</p>
     <form class="game__content">
       <div class="game__option">
         <img src="${optionOne.url}" alt="Option 1" width="${sizeOptionOne.width}" height="${sizeOptionOne.height}">
         <label class="game__answer game__answer--photo">
           <input name="question1" type="radio" value="photo">
           <span>Фото</span>
         </label>
         <label class="game__answer game__answer--paint">
           <input name="question1" type="radio" value="paint">
           <span>Рисунок</span>
         </label>
       </div>
       <div class="game__option">
         <img src="${optionTwo.url}" alt="Option 2" width="${sizeOptionTwo.width}" height="${sizeOptionTwo.height}">
         <label class="game__answer  game__answer--photo">
           <input name="question2" type="radio" value="photo">
           <span>Фото</span>
         </label>
         <label class="game__answer  game__answer--paint">
           <input name="question2" type="radio" value="paint">
           <span>Рисунок</span>
         </label>
       </div>
     </form>`;
};
