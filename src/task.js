
import {Component} from './component.js';

export class Task extends Component {

  constructor(obj) {
    super();

    this._title = obj.title;
    this._id = obj.id;
    this._dueDate = obj.dueDate;


    this._tags = obj.tags;
    this._picture = obj.picture;

    this._color = obj.color;

    this._id = obj.id;
    this._repeatingDays = obj.repeatingDays;

    this._hasDeadline = obj.hasDeadline;
    this._hasRepeat = obj.hasRepeat;

    this._isFavorite = obj.isFavorite;
    this._isDone = obj.isDone;

    this._isRepeating = obj.isRepeating;

    this._state = {
      isEdit: false,
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isExpiredTask(dueDate) {
    return dueDate ? (Date.now() - dueDate.getTime()) > 0 : false;
  }

  isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
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

      hasDeadline: this._hasDeadline,
      hasRepeat: this._hasRepeat,

      isFavorite: this._isFavorite,
      isDone: this._isDone,
    };
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
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

}
