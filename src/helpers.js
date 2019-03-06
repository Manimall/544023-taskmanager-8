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
 * @param {number} [max=10] - медиана (среднее занчение в диапазоне)
 * @return {boolean} - true или false
 */
const returnTrueOrFalse = (max = 10) => getRandomNumber() > max / 2 ? true : false;

export {getRandomNumber, returnTrueOrFalse};
