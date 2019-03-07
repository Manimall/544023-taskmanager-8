import {getRandomNumber, returnTrueOrFalse} from '.helpers.js';

const MIN_HASHTAGS_NUM = 0; // минимально допустимое кол-во тегов
const MAX_HASHTAGS_NUM = 3; // максимальное кол-во тегов по ТЗ

// данные карточки - объект со следующими полями
export const card = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * card.title.length)], // Случайная строка из трех на выбор
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000, // Дедлайн - дата запланированного выполнения (число в пределах недели от текущего момента)
  tags: new Set([
    `homework`,
    `intensive`,
    `js`,
    `best practices`,
    `frameworks`,
    `react`,
    `vue`,
    `angular`
  ])[getRandomNumber(MIN_HASHTAGS_NUM, MAX_HASHTAGS_NUM)], //  список хештегов, но без символа # в начале строки (от 0 до 3х тегов) - они не повторяются
  picture: `http://picsum.photos/100/100?r=${Math.random()})`, // URL до рандомной картинки
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][Math.floor(Math.random() * card.color.length)], // Строка, описывающая цвет карточки - одно значение из массива
  repeatingDays: { // дни недели, в которые задача повторяется или не повторяется
    'mo': returnTrueOrFalse(),
    'tu': returnTrueOrFalse(),
    'we': returnTrueOrFalse(),
    'th': returnTrueOrFalse(),
    'fr': returnTrueOrFalse(),
    'sa': returnTrueOrFalse(),
    'su': returnTrueOrFalse(),
  },
  isFavorite: returnTrueOrFalse(), // Булево значение сообщающее, добавлена ли задача в избранное.
  isDone: returnTrueOrFalse(), // Булево значение сообщающее, выполнена ли задача
};
