export const images = {
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

const questionList = [
  {
    type: `double`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    options: [{url: images.paintings[0], size: {width: 600, height: 831}}, {url: images.photos[0], size:{width: 1080, height: 720}}],
    answers: [`paint`, `photo`]
  },
  {
    type: `wide`,
    title: `Угадай, фото или рисунок?`,
    options: [{url: images.paintings[1], size: {width: 468, height: 354}}],
    answers: [`paint`]
  },
  {
    type: `triple`,
    title: `Найдите рисунок среди изображений`,
    options: [
      {url: images.paintings[2], size: {width: 1200, height: 900}},
      {url: images.photos[1],  size: {width: 650, height: 960}},
      {url: images.paintings[1],  size: {width: 468, height: 354}}],
    answers: [false, true, false]
  }
];

const questions = [...questionList, ...questionList, ...questionList];
questions.push(questionList[0]);
export {questions};

console.log(`questions`, questions);
