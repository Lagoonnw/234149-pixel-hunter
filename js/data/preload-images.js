import resize from '../utils/resize.js';
import {showMessage} from '../utils/show-message.js';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//
// // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
//     xhr.open('GET', `https://i.redd.it/apoalsgb702y.jpg` , false);
//
// // 3. Отсылаем запрос
//     xhr.send();
//
// // 4. Если код ответа сервера не 200, то это ошибка
//     if (xhr.status !== 200) {
//       // обработать ошибку
//       alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
//     }
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
