const randomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const images = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

const levels = {
  [`level-1`]: {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [images.paintings[randomInteger(0, 2)], images.photos[randomInteger(0, 2)]]
  },
  [`level-2`]: {
    title: `Угадай, фото или рисунок?`,
    images: [images.paintings[randomInteger(0, 2)]]
  },
  [`level-3`]: {
    title: `Найдите рисунок среди изображений`,
    images: [images.paintings[randomInteger(0, 2)], images.photos[randomInteger(0, 2)], images.paintings[randomInteger(0, 2)]]
  }
};
