export const renderGameOneTemplate = (question) => {
  const [optionOne, optionTwo] = question.options;

  return `
     <p class="game__task">${question.title}</p>
     <form class="game__content">
       <div class="game__option">
         <img src="${optionOne}" alt="Option 1" width="468" height="458">
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
         <img src="${optionTwo}" alt="Option 2" width="468" height="458">
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
