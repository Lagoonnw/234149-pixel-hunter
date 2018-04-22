import IntroPresentr from './screens/intro/intro-presentr.js';
import GreetingPresentrt from './screens/greeting/greeting-presentr.js';
import RulesPresentr from './screens/rules/rules-presentr.js';
import GamePresentr from './screens/game/game-presentr.js';
import StatsPresentr from './screens/stats/stats-presentr.js';
import GameModel from './data/game-model.js';

export default class Application {
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

  static showStatistics(model) {
    const stats = new StatsPresentr(model);
    stats.init();

  }
}
