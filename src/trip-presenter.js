import tripPointView from './views/trip-point-view.js';
import editPointView from './views/edit-point-view.js';
import tripEventsContainerView from './views/trip-events-container.js';
import addNewPointView from './views/add-new-point-view.js';
import { render } from './render.js';

export default class tripPresenter {
  pageComponent = new tripEventsContainerView();

  constructor({pageContainer}) {
    this.pageContainer = pageContainer;
  }

  init() {
    render(this.pageComponent, this.pageContainer);
    render(new editPointView(), this.pageComponent.getElement());
    render(new addNewPointView(), this.pageComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new tripPointView(), this.pageComponent.getElement());
    }
  }
}
