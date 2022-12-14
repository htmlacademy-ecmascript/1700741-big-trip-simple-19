import {createElement} from '../render.js';
import { html } from '../utils.js';

function createTripEventsContainerTemplate() {
  return html `<ul class="trip-events__list"></ul>`;
}

export default class tripEventsContainerView {
  getTemplate() {
    return createTripEventsContainerTemplate();
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
