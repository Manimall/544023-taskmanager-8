import {getRandomNumber, returnTrueOrFalse} from './helpers.js';
// модуль с данными для тасков

const MIN_HASHTAGS_NUM = 0; // минимально допустимое кол-во тегов
const MAX_HASHTAGS_NUM = 3; // максимальное кол-во тегов по ТЗ

const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7; // кол-во миллисекунд в неделю

// массив заголовков для тасков
const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

// массив цветов для тасков
const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

// Сет хэштегов для тасков
const tags = new Set([
  `homework`,
  `intensive`,
  `js`,
  `best practices`,
  `frameworks`,
  `react`,
  `vue`,
  `angular`
]);

/**
 * Генерируем дату (кол-во миллисекнд от начала эпохи Unix) в пределех от
 * плюс-минус неделя от текущей даты;
 * @return {Number} - числовое значение, соответствующее текущему времени — количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC
 */
const generateMockDate = () => {
  const dateNow = new Date();
  return new Date(getRandomNumber(dateNow.getTime() - MS_IN_WEEK, dateNow.getTime() + MS_IN_WEEK));
};

/**
 * Создаем карточки сопределенными по ТЗ данными
 * @return {Object} - Card - одну карточку
 */
export const createCard = () => {
  const repeatingDays = { // дни недели, в которые задача повторяется или не повторяется
    'mo': returnTrueOrFalse(),
    'tu': returnTrueOrFalse(),
    'we': returnTrueOrFalse(),
    'th': returnTrueOrFalse(),
    'fr': returnTrueOrFalse(),
    'sa': returnTrueOrFalse(),
    'su': returnTrueOrFalse(),
  };

  return {
    title: titles[Math.floor(Math.random() * titles.length)], // Случайная строка из трех на выбор
    dueDate: generateMockDate(), // Дедлайн - дата запланированного выполнения (число в пределах недели от текущего момента)
    tags: [...tags].splice(getRandomNumber(undefined, tags.size), getRandomNumber(MIN_HASHTAGS_NUM, MAX_HASHTAGS_NUM)), //  список хештегов, но без символа # в начале строки (от 0 до 3х тегов) - они не повторяются
    picture: `http://picsum.photos/100/100?r=${Math.random()})`, // URL до рандомной картинки
    color: colors[Math.floor(Math.random() * colors.length)], // Строка, описывающая цвет карточки - одно значение из массива
    repeatingDays,
    hasDeadline: returnTrueOrFalse(), // есть ли дедлайн у карточки
    hasRepeat: returnTrueOrFalse(), // повторяется ли данная карточка
    isFavorite: returnTrueOrFalse(), // Булево значение сообщающее, добавлена ли задача в избранное.
    isDone: returnTrueOrFalse(), // Булево значение сообщающее, выполнена ли задача
  };
};

