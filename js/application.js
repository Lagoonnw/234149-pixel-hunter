import IntroPresentr from './screens/intro/intro-presentr.js';
import GreetingPresentrt from './screens/greeting/greeting-presentr.js';
import RulesPresentr from './screens/rules/rules-presentr.js';
import GamePresentr from './screens/game/game-presentr.js';
import StatsPresentr from './screens/stats/stats-presentr.js';
import GameModel from './data/game-model.js';
import {adaptData} from './data/data-adapter.js';
import {preloadImages} from './data/preload-images.js';
import {initialState} from './data/game-config.js';
import {showMessage} from './utils/show-message.js';

const animationTime = 300;

const checkResponseStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
};

export default class Application {
  static start() {
    const intro = new IntroPresentr();
    const loadData = fetch(`https://es.dump.academy/pixel-hunter/questions`);

    intro.init();
    loadData
        .then(checkResponseStatus)
        .then((response) => response.json())
        .then((data) => {
          preloadImages(data)
              .then(() => adaptData(data))
              .then((res) => {
                initialState.questions = res;
                intro.stop();
                setTimeout(() => {
                  Application.showGreeting();
                }, animationTime);
              })
              .catch((err) => showMessage(err));
        })
        .catch((err) => showMessage(err));
  }

  static showIntro() {
    const intro = new IntroPresentr();
    intro.init();
  }

  static showGreeting() {
    const greeting = new GreetingPresentrt();
    greeting.init();
  }

  static showRules(userName) {
    const model = new GameModel(userName);
    const rules = new RulesPresentr();
    rules.init(model);
  }

  static showGame(model) {
    const game = new GamePresentr(model);
    game.init();
  }

  static showStatistics(model) {
    const stats = new StatsPresentr(model);
    stats.init();
  }
}
