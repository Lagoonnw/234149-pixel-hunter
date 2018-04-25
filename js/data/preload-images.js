import resize from '../utils/resize.js';
import {showMessage} from '../utils/show-message.js';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => {
      resolve(image);
    });
    image.addEventListener(`error`, () => {
      reject(`Не удалось загрузить картнку: ${url}`);
    });
    image.src = url;
  });
};

export const preloadImages = (questions = []) => {
  if (!Array.isArray(questions)) {
    throw new Error(`Invalid parameter`);
  }

  const images = questions.reduce((result, current) => {
    return result.concat(current.answers.map((answer) => answer.image));
  }, []);

  return Promise.all(images.map((image) =>
    loadImage(image.url)
        .then((img) => {
          const frame = {
            width: image.width,
            height: image.height
          };
          const imgSize = {
            width: img.width,
            height: img.height
          };
          image.size = resize(frame, imgSize);
        })
        .catch((err) => showMessage(err))));
};
