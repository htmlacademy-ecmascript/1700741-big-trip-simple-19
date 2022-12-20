import FiltersView from './views/filters-view';
import NewPointEditorView from './views/new-point-editor-view';
import PointView from './views/point-view';
import SortingView from './views/sorting-view';
import ListView from './views/list-view';
import './views/new-point-editor-view';

import Store from './store';

import CollectionModel from './models/collection-model';

import PointAdaptor from './adapters/point-adapter';
import DestinationAdaptor from './adapters/destination-adapter';
import OfferGroupAdaptor from './adapters/offer-group-adapter';

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';
import ListPresenter from './presenters/list-presentor';

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple/';
const AUTH = 'Basic qwertyalena';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdaptor(item),
  filter: filterCallbackMap[FilterType.FUTURE],
  sort: sortCallbackMap[SortType.DAY, SortType.PRICE]
});

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (item) => new DestinationAdaptor(item)
});

/**
 * @type {Store<OfferGroup>}
 */
const offersGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offerGroupsModel = new CollectionModel({
  store: offersGroupsStore,
  adapt: (item) => new OfferGroupAdaptor(item)
});

const models = [pointsModel, destinationsModel, offerGroupsModel];

const listView = document.querySelector(String(ListView));

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {
    new ListPresenter(listView, models);
  })

  .catch((error) => {
    log(error);
  });


