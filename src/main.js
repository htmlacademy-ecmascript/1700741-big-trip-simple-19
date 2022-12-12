import filtersView from './views/filters-view.js';
import sortingView from './views/sorting-view.js';
import tripPresenter from './views/trip-presenter.js';
import {render} from './render.js';
import tripPresenter from './trip-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const tripPresenter = new tripPresenter({pageContainer: siteMainElement});

render(new filtersView(), siteHeaderElement);
render(new sortingView(), siteMainElement);

tripPresenter.init();
