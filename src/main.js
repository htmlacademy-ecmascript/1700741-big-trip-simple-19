import './views/point-view';
import './views/sorting-view';
import ListView from './views/list-view';
import './views/new-point-editor-view';

import Store from './store';

import CollectionModel from './models/collection-model';

import PointAdapter from './adapters/point-adapter';
import DestinationAdapter from './adapters/destination-adapter';
import OfferGroupAdapter from './adapters/offer-group-adapter';

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';

import ListPresenter from './presenters/list-presenter';

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


