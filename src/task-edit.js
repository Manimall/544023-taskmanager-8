import {Component} from './component.js';

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

    this._isRepeating = obj.isRepeating;

    this._state = {
      isEdit: true,
      hasDeadline: false,
      hasRepeat: false,
    };

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  get templateArgs() {
    return {
      title: this._title,
      id: this._id,

      isRepeating: this._isRepeating,

      dueDate: this._dueDate,
      repeatingDays: this._repeatingDays,

      tags: this._tags,
      picture: this._picture,

      color: this._color,

      hasDeadline: this._state.hasDeadline,
      hasRepeat: this._state.hasRepeat,

      isFavorite: this._isFavorite,
      isDone: this._isDone,

      isEdit: this._state.isEdit,
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
  }

  _onChangeDate() {
    this._state.hasDeadline = !this._state.hasDeadline;
    this.unrender();
    this.render();
  }

  _onChangeRepeated() {

  }
}
