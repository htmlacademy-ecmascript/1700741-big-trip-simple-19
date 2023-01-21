import { PointType } from '../enums';
import { pointTitleMap } from '../maps';
import { formatNumber } from '../utils';
import View from '../views/views';
import Presenter from './presenter';
import {UiBlockerView.js} from './';
import PointTimeView from '../views/common/point-time-view';

/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    /** Сделан объхект из объектов  типа title: 'Taxi', value: 'taxi'  */

    const pointTypeOptions =
      Object.entries(pointTitleMap).map(([value, title]) => ({title, value}));

    /** Сделали список транспорта и сформировали из него список в поле выбора транспорта*/
    this.view.pointTypeView.setOptions(pointTypeOptions);

    /**Добавили слушатель на изменения вьюшки типа траспорта*/
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    /** Установили значение по умолчанию */
    this.view.pointTypeView.setValue(PointType.BUS);

    /** Cоставили список пунктов назначения */

    const destinationOptions =
      this.destinationsModel.listAll().map((item) => ({title: '', value: item.name}));

    //** Составили список ??????*/
    this.view.destinationView.setOptions(destinationOptions);
    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.pointTimeView.setConfig({
      dateformat: 'd/m/y H:m',

      locale: {
        'time_24hr': true,
        firstDayWeek: 1
      }
    })

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   *
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination.name);
    this.updateOffersView(point.offerIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   *
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    /** перерисовка офера*/
    const pointType = this.view.pointTypeView.getValue();
    const offerGroup = this.offerGroupsModel.findById(pointType);
    const options = offerGroup.items.map((offer) => ({
      ...offer,
      price: formatNumber(offer.price),
      checked: offerIds.includes(offer.id)
    }));

    this.view.offersView.setOptions(options);
    this.view.offersView.hidden = !options.length;
  }

  /**
 * @param {DestinationAdapter} [destination]
 */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationDetailsView.setContent(destination);
    }
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {

      const point = this.pointsModel.item();

      point.type = PointType.BUS;
      point.destinationId = this.destinationsModel.item(0).id;
      point.startDate = (new Date()).toJSON();
      point.endDate = point.startDate;
      point.basePrice = 100;
      point.offerIds = ['1', '2', '3'];

      this.view.open();
      this.updateView(point);
    }
    else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  async handleViewSubmit(event) {
    event.preventDefault();

    this.view.awaitSave(true);

    try {

    }

    catch(exception) {
      console.log(exception);
      this.view.shake();
    }

    this.view.awaitSave(false);
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();

    this.view.destinationView.setLabel(pointTitleMap[pointType]);

    this.updateOffersView();
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);

    this.updateDestinationDetailsView(destination);
  }

}
