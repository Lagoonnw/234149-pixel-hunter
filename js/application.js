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
import {checkResponseStatus} from './utils/check-response';
import {APP_ID} from "./data/game-config";

const animationTime = 300;

export default class Application {
  static start() {
    const intro = new IntroPresentr();
    const loadData = fetch(`https://es.dump.academy/pixel-hunter/questions`);

    intro.init();
    loadData
        .then(checkResponseStatus)
        .then((response) => response.json())
        .then(adaptData)
        .then(preloadImages)
        .then((res) => {
          initialState.questions = res;
          intro.stop();
          setTimeout(() => {
            Application.showGreeting();
          }, animationTime);
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

  static showRules() {
    const rules = new RulesPresentr();
    rules.init();
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const game = new GamePresentr(model);
    game.init();
  }

  static showStatistics(userName) {
    const url = `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${userName}`;
    fetch(url)
        .then(checkResponseStatus)
        .then((response) => response.json())
        .then((data) => {
          const stats = new StatsPresentr(data);
          stats.init();
        })
        .catch((err) => showMessage(err));
  }

  static sendResultToServer(result) {
    const url = `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${result.userName}`;
    const fetchRequest = {
      method: `POST`,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      }
    };
    return fetch(url, fetchRequest)
        .catch(() => showMessage(`Данные не были отправлены`));
  }
}
