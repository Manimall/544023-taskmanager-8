import {generateTags} from './generate-hashtag.js';
import {generateRepeatingDays} from './generate-repeating-days.js';
import {isRepeating} from './tasks-data.js';

import {returnColorsTemplate} from './generate-tasks-colors.js';


const generateDefaultTask = ({title, colorValue, repeatingDays, tags, id}) => {
  return (
    `<article class="card
               ${colorValue}
               ${isRepeating(repeatingDays) ? `card--repeat` : ``}"
               id="${id}"
      >
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">edit</button>
          <button type="button" class="card__btn card__btn--archive">archive</button>
          <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${generateTags(tags)}
              </div>
            </div>
          </div>
        </div>
     </article>`
  );
};

/**
 * Отрисовываем шаблон карточки (разметку отдельной карточки)
 * @param {Object} card - Объект с данными одной карточки
 * @return {String} - разметку (строку с заполненными данными)
 */
const generateEditTask = ({colors, colorValue, colorKey, title, hasDeadline, dueDate, hasRepeat, tags, repeatingDays, picture, isEdit, id}) => {
  return (
    `<article class="card
                ${isEdit ? `card--edit` : ``}
                ${isRepeating(repeatingDays) ? `card--repeat` : ``}
                ${colorValue}"
                id="${id}"
      >
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
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${hasDeadline ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" disabled="">
                <label class="card__input-deadline-wrap">
                  <input class="card__date"
                         type="text"
                         name="date"
                         value="${dueDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`})}"
                         placeholder="${dueDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`})}"
                  >
                </label>
                <label class="card__input-deadline-wrap">
                  <input class="card__time"
                         type="text"
                         name="time"
                         value="${dueDate.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}"
                         placeholder="${dueDate.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`})}"
                  >
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${hasRepeat ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" disabled="">
                <div class="card__repeat-days-inner">
                  ${generateRepeatingDays(repeatingDays)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${generateTags(tags)}
              </div>

              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
              </label>
            </div>
          </div>

          <label class="card__img-wrap card__img-wrap--empty">
            <input type="file" class="card__img-input visually-hidden" name="img">
            <img src="${picture}" alt="task picture" class="card__img">
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
              ${returnColorsTemplate(colors, colorKey)}
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};

export {generateEditTask, generateDefaultTask};


