import './views/point-view';
import './views/sorting-view';
import ListView from './views/list-view';
import FiltersView from './views/filters-view';
import SortingView from './views/sorting-view';
import NewPointEditorView from './views/new-point-editor-view';

import './views/new-point-editor-view';

import Store from './store';

import CollectionModel from './models/collection-model';

import PointAdapter from './adapters/point-adapter';
import DestinationAdapter from './adapters/destination-adapter';
import OfferGroupAdapter from './adapters/offer-group-adapter';

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';

import ListPresenter from './presenters/list-presenter';
import FilterPresenter from './presenters/filter-presenter';
import SortPresenter from './presenters/sort-presenter';
import NewPointButtonPresenter from './presenters/new-point-button-presenter';
import NewPointEditorPresenter from './presenters/new-point-editor-presenter';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic qwertyalena';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.FUTURE],
  sort: sortCallbackMap[SortType.DAY, SortType.PRICE]
});

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (item) => new DestinationAdapter(item)
});

/**
 * @type {Store<OfferGroup>}
 */
const offersGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offerGroupsModel = new CollectionModel({
  store: offersGroupsStore,
  adapt: (item) => new OfferGroupAdapter(item)
});

const models = [pointsModel, destinationsModel, offerGroupsModel];

const newPointButtonView = document.querySelector('.trip-main__event-add-btn');
const filterView = document.querySelector(String(FiltersView));
const sortView = document.querySelector(String(SortingView));
const listView = document.querySelector(String(ListView));
const newPointEditorView = new NewPointEditorView(listView);

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {

    new NewPointButtonPresenter(newPointButtonView, models);
    new FilterPresenter(filterView, models);
    new SortPresenter(sortView, models);
    new ListPresenter(listView, models);
    new NewPointEditorPresenter(newPointEditorView, models);
  })

  .catch((error) => {
    console.log(error);
  });


