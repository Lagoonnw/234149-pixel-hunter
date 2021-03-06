import {Lives, Time} from './../data/game-config.js';

export default (state) => {
  const emptyLives = new Array(Lives.MAX - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`);

  return `
     <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      <h1 class="game__timer">${Time.MAX}</h1>
      <div class="game__lives">
      ${emptyLives.join(``)}
      ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>
    </header>`;
};
