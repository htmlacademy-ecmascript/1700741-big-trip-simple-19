import {createElement} from '../render.js';

function createTripPointTemplate() {
  return ('  ');
}

export default class tripPointView {
  getTemplate() {
    return createTripPointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
