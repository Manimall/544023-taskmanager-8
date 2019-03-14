export class TaskEdit {
  constructor(obj) {
    this._title = obj.title;
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

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  render(getTemplate) {
    const newElement = document.createElement(`div`);

    const templateArgs = {
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

      isEdit: this._isEdit,
    };

    newElement.innerHTML = getTemplate(templateArgs);
    this._element = newElement.firstChild;
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
  }

  unbind() {
    this._elementment.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}
