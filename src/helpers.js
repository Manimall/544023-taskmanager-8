/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 0, max = 10) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
 * Возвращаем true или false от функции getRandomNumber и сравниваем с медианой
 * @return {boolean} - true или false
 */
const returnTrueOrFalse = () => Math.random() > 0.5;


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const KeyCodes = {
  ESC: 27,
  ENTER: 13
};


export {getRandomNumber, returnTrueOrFalse, createElement, KeyCodes};
