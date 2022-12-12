import {createElement} from '../render.js';

function createAddNewPointTemplate() {
  return (' ');
}

export default class addNewPointView {
  getTemplate() {
    return createAddNewPointTemplate();
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
