import {Lives, Time} from './game-config.js';

const levelOne = {
  question: `Угадайте для каждого изображения фото или рисунок?`
};
const levelTwo = {
  question: `Угадай, фото или рисунок?`
};
const levelThree = {
  question: `Найдите рисунок среди изображений`
};

export const initialState = {
  lives: Lives.MAX,
  time: Time.MIN
};

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

export const levels = new Map().
    set(`level-1`, levelOne).
    set(`level-2`, levelTwo).
    set(`level-3`, levelThree);
