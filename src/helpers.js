/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
export const getRandomNumber = (min = 0, max = 10) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
