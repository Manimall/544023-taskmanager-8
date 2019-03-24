import {generateTags} from './generate-hashtag.js';
import {generateRepeatingDays} from './generate-repeating-days.js';

import {isRepeating} from './tasks-data.js';
import {Colors} from './tasks-data.js';

import {returnColorsTemplate} from './generate-tasks-colors.js';

import moment from 'moment';


const generateDefaultTask = ({title, color, picture, dueDate, hasDeadline, repeatingDays, tags, id}) => {
  return (
    `<article class="card
               ${Colors[color]}
               ${isRepeating(repeatingDays) ? `card--repeat` : ``}
               ${hasDeadline ? `card--deadline` : ``}"
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

            <div class="card__dates">

              <fieldset class="card__date-deadline" ${!hasDeadline ? `disabled` : `` }>
                <label class="card__input-deadline-wrap">
                  <input class="card__date"
                          type="text"
                          placeholder="${dueDate ? moment(dueDate).format(`D MMMM`) : ``}"
                          name="date"
                          value="${dueDate ? moment(dueDate).format(`D MMMM`) : ``}"
                  >
                </label>

                <label class="card__input-deadline-wrap">
                  <input class="card__time"
                         type="text"
                         placeholder="${dueDate ? moment(dueDate).format(`hh:mm A`) : ``}"
                         name="time"
                         value="${dueDate ? moment(dueDate).format(`hh:mm A`) : ``}"
                  >
                </label>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${generateTags(tags)}
              </div>
            </div>

          </div>

          <label class="card__img-wrap ">
            <img src="${picture}" alt="task picture" class="card__img">
          </label>

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
const generateEditTask = ({color, title, hasDeadline, dueDate, hasRepeat, tags, repeatingDays, picture, isEdit, id}) => {
  return (
    `<article class="card
                ${isEdit ? `card--edit` : ``}
                ${isRepeating(repeatingDays) ? `card--repeat` : ``}
                ${Colors[color]}
                ${hasDeadline ? `card--deadline` : ``}"
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
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${hasDeadline ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${!hasDeadline ? `disabled` : `` }>
                <label class="card__input-deadline-wrap">
                  <input class="card__date"
                         type="text"
                         name="date"
                         value="${dueDate ? moment(dueDate).format(`D MMMM`) : ``}"
                         placeholder="${dueDate ? moment(dueDate).format(`D MMMM`) : ``}"
                  >
                </label>
                <label class="card__input-deadline-wrap">
                  <input class="card__time"
                         type="text"
                         name="time"
                         value="${dueDate ? moment(dueDate).format(`hh:mm A`) : ``}"
                         placeholder="${dueDate ? moment(dueDate).format(`hh:mm A`) : ``}"
                  >
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${hasRepeat ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${!hasRepeat && `disabled`}>
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
              ${returnColorsTemplate(color)}
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


