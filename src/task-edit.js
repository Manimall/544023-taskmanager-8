import {Component} from './component.js';
import {Colors} from './tasks-data.js';

import {createElement, KeyCodes} from './helpers.js';

import {generateRepeatingDays} from './generate-repeating-days.js';
import {returnColorsTemplate} from './generate-tasks-colors.js';
import {generateTags} from './generate-hashtag.js';

import moment from 'moment';
import flatpickr from 'flatpickr';


export class TaskEdit extends Component {
  constructor(obj) {
    super();
    this._title = obj.title;
    this._dueDate = obj.dueDate;
    this._hasDate = obj.hasDate;

    this._tags = new Set(obj.tags);
    this._picture = obj.picture;

    this._color = obj.color;

    this._id = obj.id;
    this._repeatingDays = obj.repeatingDays;

    this._isFavorite = obj.isFavorite;
    this._isDone = obj.isDone;

    this._state = {
      isEdit: true,
      isRepeated: this._isRepeating(),
    };

    this._onSubmit = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDateStatusChange = this._onDateStatusChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onRepeatedStateChange = this._onRepeatedStateChange.bind(this);
    this._onRepeatedDaysChange = this._onRepeatedDaysChange.bind(this);
    this._onHashTagDelete = this._onHashTagDelete.bind(this);
    this._onHashTagAdd = this._onHashTagAdd.bind(this);
  }

  // определяем просрочен ли Таск
  _isExpired() {
    if (this._dueDate && this._hasDate) {
      return Date.now() > this._dueDate;
    }
    return false;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _getDueDateMarkup() {
    return `<fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="${this._dueDate ? moment(this._dueDate).format(`DD MMMM YY`) : moment().add(1, `days`).format(`DD MMMM`)}"
                  name="date"
                  value="${this._dueDate ? moment(this._dueDate).format(`DD MMMM YY`) : moment().add(1, `days`).format(`DD MMMM`)}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="${this._dueDate ? moment(this._dueDate).format(`hh:mm a`) : moment().add(1, `days`).format(`hh:mm a`)}"
                  name="time"
                  value="${this._dueDate ? moment(this._dueDate).format(`hh:mm a`) : moment().add(1, `days`).format(`hh:mm a`)}"
                />
              </label>
            </fieldset>`;
  }

  get template() {
    return (
      `<article class="card
                    ${this._state.isEdit ? `card--edit` : ``}
                    ${this._state.isRepeated ? `card--repeat` : ``}
                    ${Colors[this._color]}
                    ${this._isExpired() ? `card--deadline` : ``}"
                    id="${this._id}"
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
                <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._hasDate ? `yes` : `no`}</span>
                  </button>

                  ${this._hasDate ? `${this._getDueDateMarkup()}` : ``}

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                    ${generateRepeatingDays(this._repeatingDays)}
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${this._tags ? generateTags(this._tags) : ``}
                  </div>

                  <label>
                    <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                  </label>
                </div>
              </div>

              <label class="card__img-wrap card__img-wrap--empty">
                <input type="file" class="card__img-input visually-hidden" name="img">
                <img src="${this._picture}" alt="task picture" class="card__img">
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                  ${returnColorsTemplate(this._color)}
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
  }

  _getSingleTag(tag) {
    return `
      <span class="card__hashtag-inner">
        <input type="hidden"
               name="hashtag"
               value="${tag}"
        class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
        ${tag}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`;
  }

  update(obj) {
    this._title = obj.title;
    this._tags = obj.tags;
    this._color = obj.color;
    this._repeatingDays = obj.repeatingDays;
    this._dueDate = obj.dueDate;
    this._hasDate = obj.hasDate;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onDateStatusChange);
    this._element.querySelector(`.card__repeat-days`).addEventListener(`change`, this._onRepeatedDaysChange);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onRepeatedStateChange);
    this._element.querySelector(`.card__hashtag-list`).addEventListener(`click`, this._onHashTagDelete);
    this._element.querySelector(`.card__hashtag-input`).addEventListener(`keydown`, this._onHashTagAdd);

    if (this._hasDate) {
      this._setUpFlatpickr();
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onDateStatusChange);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onRepeatedStateChange);
    this._element.querySelector(`.card__repeat-days`).removeEventListener(`change`, this._onRepeatedDaysChange);
    this._element.querySelector(`.card__hashtag-list`).removeEventListener(`click`, this._onHashTagDelete);
    this._element.querySelector(`.card__hashtag-input`).removeEventListener(`keydown`, this._onHashTagAdd);
  }


  _onDateStatusChange() {
    this._hasDate = !this._hasDate;
    this._adAndRemoveListeners();
  }

  _setUpFlatpickr() {
    flatpickr(this._element.querySelector(`.card__date`), {
      altInput: true,
      altFormat: `j F Y`,
      dateFormat: `j F Y`,
      onChange: (selectedDates) => {
        this._dueDate = selectedDates[0];
        this._updateElement();
      },
    });
    flatpickr(this._element.querySelector(`.card__time`), {
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `h:i K`,
      dateFormat: `h:i K`
    });
  }

  _onRepeatedStateChange() {
    this._state.isRepeated = !this._state.isRepeated;
    this._updateElement();
  }

  _onRepeatedDaysChange(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`card__repeat-day-input`)) {
      this._repeatingDays[evt.target.value] = evt.target.checked;
      this._state.isRepeated = Object.values(this._repeatingDays).some((it) => it === true);

      if (this._state.isRepeated && !this._element.classList.contains(`card--repeat`)) {
        this._element.classList.add(`card--repeat`);
      }
      if (!this._state.isRepeated) {
        this._element.classList.remove(`card--repeat`);
      }
    }
  }

  _onHashTagDelete(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`card__hashtag-delete`)) {
      const hashtagValue = evt.target.parentNode.querySelector(`.card__hashtag-hidden-input`).value;
      this._tags.delete(hashtagValue);
      evt.target.closest(`.card__hashtag-inner`).remove();
    }
  }

  _onHashTagAdd(evt) {
    if (evt.which === KeyCodes.ENTER) {
      const hashtags = event.target.value.split(` `)
        .filter((it) => it.startsWith(`#`)).join(``)
        .split(`#`)
        .filter((it) => (it.length >= 3 && it.length <= 8));

      if (hashtags[0] && !this._tags.has(hashtags[0]) && this._tags.size < 5) {
        this._tags.add(hashtags[0]);
        this._element.querySelector(`.card__hashtag-list`).appendChild(createElement(this._getSingleTag(hashtags[0])));
        event.target.value = ``;

        this._adAndRemoveListeners();
      }
    }
  }

  _onColorChange(evt) {

    this._element.classList.remove(Colors[this._color]);

    this._element.classList.add(Colors[evt.target.value]);
    this._color = evt.target.value;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      },
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (taskEditMapper.hasOwnProperty(key)) {
        taskEditMapper[key](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(Object.assign(newData, {hasDate: this._hasDate}));
    }

    this.update(newData);
  }

  // собираем данные из формы и приводим их к нужному виду
  static createMapper(target) {
    return {
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      hashtag: (value) => target.tags.add(value),
      date: (value) => (target.dueDate = new Date(value)),
      repeat: (value) => (target.repeatingDays[value] = true),
    };
  }

}
