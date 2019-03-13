class Task {
  constructor(obj) {
    this._title = obj.title;
    this._dueDate = obj.dueDate;
    this._tags = obj.tags;
    this._picture = obj.picture;
    this._color = obj.color;
    this._repeatingDays = obj.repeatingDays;
    this._hasDeadline = obj.hasDeadline;
    this._hasRepeat = obj.hasRepeat;
    this._isFavorite = obj.isFavorite;
    this._isDone = obj.isDone;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  render(getTemplate, placeToInsert) {
    const templateArgs = {
      title = this._title,
      tags = this._obj.tags

    }
  }

  const createTempalate = () => {
    return (
     `<div>
      <div>Title</div>
      <div>Content</div>
     </div>`
    );
   }


};
