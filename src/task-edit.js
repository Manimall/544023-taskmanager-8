import {Component} from './component.js';
import {Colors} from './tasks-data.js';

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
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onChangeRepeatedDays = this._onChangeRepeatedDays.bind(this);
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

  update(obj) {
    this._title = obj.title;
    this._tags = obj.tags;
    this._color = obj.color;
    this._repeatingDays = obj.repeatingDays;
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`change`, this._onColorChange);
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`change`, this._onColorChange);
  }

  _onChangeDate() {
    this._state.hasDeadline = !this._state.hasDeadline;
    this.unrender();
    this.render();
  }

  _onTitleChange(evt) {
    this._title = evt.target.value;
  }

  _onColorChange(evt) {
    this._element.classList.remove(Colors[this._color]);

    this._element.classList.add(Colors[evt.target.value]);
    this._color = evt.target.value;
  }

  set onSubmit(fn) {
    this._onSubmit = function () {
      const updates = {
        title: this._title,
        color: this._color,
        tags: this._tags,
        repeatingDays: this._repeatingDays,
        dueDate: this._dueDate,
      };

      fn(updates);
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onChangeRepeatedDays() {

  }
}
