import {introTemplate} from './../templates/intro.js';
import getElementFromTemplate from './../utils/get-element.js';
import renderScreen from './../utils/render-screen.js';
import greetingsScreen from './greeting.js';
import {GameState} from "../data/game-state.js";
import {initialState} from "../data/data.js";

const page = `${introTemplate}`;
const gameState = new GameState(initialState);
const introScreen = getElementFromTemplate(page);
const asterisk = introScreen.querySelector(`.intro__asterisk`);


const onAsteriskClick = () => {
  renderScreen(greetingsScreen(gameState));
};

asterisk.addEventListener(`click`, onAsteriskClick);

export default introScreen;
