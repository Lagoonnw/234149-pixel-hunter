import {statsTemplate} from './../templates/stats.js';
import {footer} from './../templates/footer.js';
import {default as getElementFromTemplate} from './../utils/get-element.js';
import {addBackToIntroHandler} from './../utils/back-to-intro.js';

const page = `${statsTemplate}\n${footer}`;
const statsScreen = getElementFromTemplate(page);

addBackToIntroHandler(statsScreen);

export default statsScreen;
