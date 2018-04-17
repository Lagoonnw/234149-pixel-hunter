import GameOneView from './game-1-view.js';
import GameTwoView from './game-2-view.js';
import render from '../../utils/render-screen.js';
import {GameTypes} from '../../data/game-config.js';
import {Answer} from '../../data/answer.js';


export default class GamePresentr {
  constructor(state) {
    this.state = state;
    this.questionType = this.state.questions[this.state.level].type;
  }
  init() {
    const checkAnswer = (value, answer) => value === answer;
    const die = -1;

    console.log(this.questionType === GameTypes.double);
    // this.view = new GameOneView(this.state);

    if (this.questionType === GameTypes.double) {
      this.view = new GameOneView(this.state);
      this.view.onAnswer = (firstValue, secondValue) => {
        const [firstAnswer, secondAnswer] = this.state.questions[this.state.level].answers;
        const isFirstAnswerCorrect = checkAnswer(firstValue, firstAnswer);
        const isFirstAnswerCorrect = checkAnswer(secondValue, secondAnswer);

        const answer = new Answer((isFirstAnswerCorrect && isFirstAnswerCorrect), 15);
        this.state.addAnswer(answer);

        if (this.state.nextLevel() === die) {
          
        }

        console.log(firstValue, secondValue);



      }
      render(this.view.element);
    }

    if (this.questionType === GameTypes.single) {
      this.view = new GameTwoView(this.state);
      this.view.onAnswer = (value) => {
        console.log(value);

      }
      render(this.view.element);
    }

    // render(this.view.element);
  }
}
