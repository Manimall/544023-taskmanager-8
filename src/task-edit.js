import {Component} from './component.js';
import {Colors} from './tasks-data.js';

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

    this._tags = obj.tags;
    this._picture = obj.picture;

    this._color = obj.color;

    this._id = obj.id;
    this._repeatingDays = obj.repeatingDays;

    this._isFavorite = obj.isFavorite;
    this._isDone = obj.isDone;

    this._state = {
      isEdit: true,
      hasDeadline: obj.hasDeadline,
      isRepeated: this._isRepeating(),
    };

    this._onSubmit = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onDateChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onRepeatedDaysChange = this._onRepeatedDaysChange.bind(this);
  }

  _isExpiredTask(dueDate) {
    return dueDate ? (Date.now() - dueDate.getTime()) > 0 : false;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get template() {
    return (
      `<article class="card
                    ${this._state.isEdit ? `card--edit` : ``}
                    ${this._isRepeating() ? `card--repeat` : ``}
                    ${Colors[this._color]}
                    ${this._isExpiredTask(this._dueDate) ? `card--deadline` : ``}"
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
                    date: <span class="card__date-status">${this._state.hasDeadline ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${!this._state.hasDeadline ? `disabled` : `` }>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date"
                            type="text"
                            name="date"
                            value="${this._dueDate ? moment(this._dueDate).format(`D MMMM`) : ``}"
                            placeholder="${this._dueDate ? moment(this._dueDate).format(`D MMMM`) : ``}"
                      >
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time"
                            type="text"
                            name="time"
                            value="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
                            placeholder="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
                      >
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                    ${generateRepeatingDays(this._repeatingDays)}
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${generateTags(this._tags)}
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

  update(obj) {
    this._title = obj.title;
    this._tags = obj.tags;
    this._color = obj.color;
    this._repeatingDays = obj.repeatingDays;
    this._hasDeadline = obj._state.hasDeadline;
    this._dueDate = obj.dueDate;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onDateChange);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onRepeatedDaysChange);

    const dueDatePicker = this._element.querySelector(`.card__date`);
    const dueTimePicker = this._element.querySelector(`.card__time`);

    if (this._state.hasDeadline) {
      flatpickr(dueDatePicker, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });
      flatpickr(dueTimePicker, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onDateChange);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onRepeatedDaysChange);
  }

  _onDateChange() {
    this._state.hasDeadline = !this._state.hasDeadline;
    this._adAndRemoveListeners();
  }

  _onTitleChange(evt) {
    this._title = evt.target.value;
  }

  _onRepeatedDaysChange() {
    this._state.isRepeated = !this._state.isRepeated;
    this._adAndRemoveListeners();
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

    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onChangeRepeatedDays() {
    this._state.isRepeated = !this._state.isRepeated;
  }

  // собираем данные из формы и приводим их к нужному виду
  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      date: (value) => (target.dueDate = value),
      repeatingDays: (value) => (target.repeatingDays[value] = true),
    };
  }

}
