'use strict';

const filterSection = document.querySelector(`.main__filter`); // секция с фильтрами

// массив с данными фильтров
const filters = [
  {
    id: `All`,
    isChecked: false,
    isDisabled: false
  },
  {
    id: `Overdue`,
    isChecked: false,
    isDisabled: true
  },
  {
    id: `Today`,
    isChecked: true
  },
  {
    id: `Favorites`
  },
  {
    id: `Repeating`,
    isDisabled: true
  },
  {
    id: `Tags`,
    isChecked: true
  },
  {
    id: `Archive`
  }
];

/**
 * Функция для случайного числа (от и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=30] - максимальное кол-во задач
 * @returns {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 0, max = 30) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
 *  Функция для отрисовки отдельного фильтра
 * @param {String} id - id фильтра
 * @param {Number} [amount=0] - кол-во элементов в фильтре (если не задано - ставим 0)
 * @param {boolean} [isChecked=false] - если true - ставим аттрибут checked (по умолчанию false)
 * @param {boolean} [isDisabled=false] - если true - ставим аттрибут disabled (по умолчанию false)
 * @returns {String} - разметку (строку) с заполненными данными
 */
const renderSingleFilter = (id, amount = 0, isChecked = false, isDisabled = false) =>
  `
  <input
    type="radio"
    id="filter__${id.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${isDisabled ? `disabled` : ``}
  >
  <label for="filter__${id}" class="filter__label">
    ${id.toLowerCase()}
    <span class="filter__archive-count">${amount}</span><
  /label>
  `
;
/**
 *
 * @param {string} [textAreaValue=``]
 * @param {boolean} [hasDate=false]
 * @param {boolean} [hasRepeat=false]
 * @returns
 */
const renderSingleCard = (textAreaValue = ``, hasDate = false, hasRepeat = false) => {
  return `
  <article class="card card--edit card--black">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${textAreaValue}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${hasDate ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__date-deadline" disabled="">
              <label class="card__input-deadline-wrap">
                <input class="card__date" type="text" placeholder="23 September" name="date">
              </label>
              <label class="card__input-deadline-wrap">
                <input class="card__time" type="text" placeholder="11:15 PM" name="time">
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${hasRepeat ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" disabled="">
              <div class="card__repeat-days-inner">
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-1" name="repeat" value="mo">
                <label class="card__repeat-day" for="repeat-mo-1">mo</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-1" name="repeat" value="tu" checked="">
                <label class="card__repeat-day" for="repeat-tu-1">tu</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-1" name="repeat" value="we">
                <label class="card__repeat-day" for="repeat-we-1">we</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-1" name="repeat" value="th">
                <label class="card__repeat-day" for="repeat-th-1">th</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-1" name="repeat" value="fr" checked="">
                <label class="card__repeat-day" for="repeat-fr-1">fr</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-1">
                <label class="card__repeat-day" for="repeat-sa-1">sa</label>
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-1" name="repeat" value="su" checked="">
                <label class="card__repeat-day" for="repeat-su-1">su</label>
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list"></div>

            <label>
              <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
            </label>
          </div>
        </div>

        <label class="card__img-wrap card__img-wrap--empty">
          <input type="file" class="card__img-input visually-hidden" name="img">
          <img src="img/add-photo.svg" alt="task picture" class="card__img">
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input type="radio" id="color-black-1" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" checked="">
            <label for="color-black-1" class="card__color card__color--black">black</label>
            <input type="radio" id="color-yellow-1" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow">
            <label for="color-yellow-1" class="card__color card__color--yellow">yellow</label>
            <input type="radio" id="color-blue-1" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
            <label for="color-blue-1" class="card__color card__color--blue">blue</label>
            <input type="radio" id="color-green-1" class="card__color-input card__color-input--green visually-hidden" name="color" value="green">
            <label for="color-green-1" class="card__color card__color--green">green</label>
            <input type="radio" id="color-pink-1" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
            <label for="color-pink-1" class="card__color card__color--pink">pink</label>
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>
  `;
};


// отрисовываем фильтры в нужный блок в разметке
const renderFiltersBlock = (filterData, insertSection) => {
  const filterFragment = document.createDocumentFragment();
  filterData.forEach((filter)=> {
    const renderedFilter = renderSingleCard(filter);
  });
  filterFragment.appendChild(renderedFilter);
  insertSection.appendChild(filterFragment);
};

renderFiltersBlock(filtersArray, filterSection);
