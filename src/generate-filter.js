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
    ${filterData.amount === 0 ? `disabled` : ``}
  >
  <label for="filter__${filterData.id.toLowerCase()}" class="filter__label">
    ${filterData.id.toLowerCase()}
    <span class="filter__${filterData.id.toLowerCase()}-count">${filterData.amount}</span>
  </label>
  `
;

export {renderSingleFilter};
