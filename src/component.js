import {createElement} from './helpers.js';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Нельзя создать экземпляр данного класса напрямую,
      разрешено создавать лишь наследников данного класса`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  bind() {}

  unbind() {}

  get templateArgs() {
    return {};
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _adAndRemoveListeners() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  update() {

  }

}
