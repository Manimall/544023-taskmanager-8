import {getRandomNumber} from 'helpers';

// Массив с данными фильтров, содержащий следующие данные, для каждого фильтра:
// id фильтра (строка), amount - кол-во элементов в фильтре, атрибут checked (по умолчанию false), аттрибут disabled (по умолчанию false)
const filters = [
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

/**
 * Отрисовываем отдельный фильтр (разметку отдельного фильтра)
 * @param {Array} filterData - массив обьектов, содержащий данные фильтров
 * @return {String} - разметку (строку с заполненными данными)
 */
const renderSingleFilter = (filterData) =>
  `
  <input
    type="radio"
    id="filter__${filterData.id.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${filterData.isChecked ? `checked` : ``}
    ${filterData.isDisabled ? `disabled` : ``}
  >
  <label for="filter__${filterData.id.toLowerCase()}" class="filter__label">
    ${filterData.id.toLowerCase()}
    <span class="filter__${filterData.id.toLowerCase()}-count">${filterData.amount}</span>
  </label>
  `
;

export {filters, renderSingleFilter};
