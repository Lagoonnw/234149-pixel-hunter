import IntroPresenter from './screens/intro/intro-presenter.js';
import GreetingPresentrt from './screens/greeting/greeting-presenter.js';
import RulesPresenter from './screens/rules/rules-presenter.js';
import GamePresenter from './screens/game/game-presenter.js';
import StatsPresenter from './screens/stats/stats-presenter.js';
import GameModel from './data/game-model.js';
import {adaptData} from './data/data-adapter.js';
import {preloadImages} from './data/preload-images.js';
import {initialState} from './data/game-config.js';
import {showMessage} from './utils/show-message.js';
import {checkResponseStatus} from './utils/check-response';
import {APP_ID, ServerPaths} from "./data/game-config";

const ANIMATION_TIME = 300;
const INTERVAL = 3000;

export default class Application {
  static start() {
    const intro = new IntroPresenter();
    const loadData = fetch(ServerPaths.DATA);

    intro.init();
    loadData
        .then(checkResponseStatus)
        .then((response) => response.json())
        .then(adaptData)
        .then(preloadImages)
        .then((res) => {
          initialState.questions = res;
          setTimeout(() => {
            intro.stop();
            setTimeout(() => {
              Application.showGreeting();
            }, ANIMATION_TIME);
          }, INTERVAL);
        })
        .catch((err) => showMessage(err));
  }

  static showIntro() {
    const intro = new IntroPresenter();
    intro.init();
  }

  static showGreeting() {
    const greeting = new GreetingPresentrt();
    greeting.init();
  }

  static showRules() {
    const rules = new RulesPresenter();
    rules.init();
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const game = new GamePresenter(model);
    game.init();
  }

  static showStatistics(userName) {
    const url = `${ServerPaths.STATS}${APP_ID}-${userName}`;
    fetch(url)
        .then(checkResponseStatus)
        .then((response) => response.json())
        .then((data) => {
          const stats = new StatsPresenter(data);
          stats.init();
        })
        .catch((err) => showMessage(err));
  }

  static sendResultToServer(result) {
    const url = `${ServerPaths.STATS}${APP_ID}-${result.userName}`;
    const fetchRequest = {
      method: `POST`,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      }
    };
    return fetch(url, fetchRequest)
        .catch(() => showMessage(`Данные не были отправлены на сервер`));
  }
}
