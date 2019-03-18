import {createElement} from './helpers.js';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Нельзя ссоздать экземпляр данного класса напрямую,
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

  render(getTemplate) {
    const templateArgs = {};
    this._element = createElement(getTemplate, templateArgs);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
