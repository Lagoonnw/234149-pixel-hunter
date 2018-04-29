import resize from '../utils/resize.js';
import {showMessage} from '../utils/show-message.js';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => {
      resolve(image);
    });
    image.addEventListener(`error`, () => {
      reject(`Не удалось загрузить картинку: ${url}`);
    });
    image.src = url;
  });
};

export const preloadImages = (questions = []) => {
  if (!Array.isArray(questions)) {
    throw new Error(`Invalid parameter`);
  }

  return Promise.all(questions.map((question) => {
    for (const option of question.options) {
      loadImage(option.url)
          .then((img) => {
            const frame = {
              width: option.size.width,
              height: option.size.height
            };
            const imgSize = {
              width: img.width,
              height: img.height
            };
            option.size = resize(frame, imgSize);
          })
          .catch((err) => showMessage(err));
    }
    return question;
  }));
};
