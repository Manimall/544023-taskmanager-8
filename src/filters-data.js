// Импорт относительно текущего модуля
import {getRandomNumber} from './helpers.js';

// Массив с данными фильтров, содержащий следующие данные, для каждого фильтра:
// id фильтра (строка), amount - кол-во элементов в фильтре, атрибут checked (по умолчанию false), аттрибут disabled (по умолчанию false)
export const filters = [
  {
    id: `All`,
    amount: getRandomNumber(),
    isChecked: false,
    isDisabled: false
  },
  {
    id: `Overdue`,
    amount: getRandomNumber(),
    isChecked: false,
    isDisabled: true
  },
  {
    id: `Today`,
    amount: getRandomNumber(),
    isChecked: true
  },
  {
    id: `Favorites`,
    amount: getRandomNumber()
  },
  {
    id: `Repeating`,
    amount: getRandomNumber(),
    isDisabled: true
  },
  {
    id: `Tags`,
    amount: getRandomNumber(),
    isChecked: true
  },
  {
    id: `Archive`,
    amount: getRandomNumber()
  }
];
