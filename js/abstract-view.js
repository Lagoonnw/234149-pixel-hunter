export default class AbstractView {
  constructor() {
    if (new.target === `AbstractView`) {
      throw new Error(`This class is abstract`);
    }
  }

  get template() {
  }

  get element() {
    if (!this._element) {
      this._element = this._render();
      this.bind();
    }
    return this._element;
  }

  bind() {
  }

  unbind() {
  }

  _render() {
    this._div = document.createElement(`div`);
    this._div.innerHTML = this.template;

    return this._div;
  }
}
