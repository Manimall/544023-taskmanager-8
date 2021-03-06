
import {Component} from './component.js';

import {Colors} from './tasks-data.js';
import {generateTags} from './generate-hashtag.js';

import moment from 'moment';


export class Task extends Component {

  constructor(obj) {
    super();

    this._title = obj.title;
    this._id = obj.id;

    this._dueDate = obj.dueDate;
    this._hasDate = obj.hasDate;

    this._tags = obj.tags;
    this._picture = obj.picture;

    this._color = obj.color;

    this._id = obj.id;
    this._repeatingDays = obj.repeatingDays;

    this._isFavorite = obj.isFavorite;
    this._isDone = obj.isDone;

    this._state = {
      isEdit: false,
      isRepeated: this._isRepeating(),
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
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
    return `
      <fieldset class="card__date-deadline" ${this._hasDate ? `` : `disabled` }>
        <label class="card__input-deadline-wrap">
          <input class="card__date"
                  type="text"
                  placeholder="${this._dueDate ? moment(this._dueDate).format(`D MMMM YY`) : ``}"
                  name="date"
                  value="${this._dueDate ? moment(this._dueDate).format(`D MMMM YY`) : ``}"
          >
        </label>

        <label class="card__input-deadline-wrap">
          <input class="card__time"
                  type="text"
                  placeholder="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
                  name="time"
                  value="${this._dueDate ? moment(this._dueDate).format(`hh:mm A`) : ``}"
          >
        </label>
      </fieldset>
    `;
  }

  get template() {
    return (
      `<article class="card
                  ${Colors[this._color]}
                  ${this._state.isRepeated ? `card--repeat` : ``}
                  ${this._isExpired() ? `card--deadline` : ``}"
                  id="${this._id}"

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
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>


          <div class="card__settings">
            <div class="card__details">

              <div class="card__dates">
                ${this._getDueDateMarkup()}
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${generateTags(this._tags)}
                </div>
              </div>

            </div>

            <label class="card__img-wrap ">
              <img src="${this._picture}" alt="task picture" class="card__img">
            </label>

          </div>
        </div>
      </article>`
    );
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
    this._hasDate = data.hasDate;
    this._updateState();
  }

  _updateState() {
    this._state.isRepeated = this._isRepeating();
  }

}
