import { PointType } from "../enums";
import { pointIconMap, pointTitleMap } from "../maps";
import Presenter from "./presenter";

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);
    console.log('123');
  }

   updateView() {
    this.view.setItems(
      this.pointsModel.list().map(this.createPointViewState, this);
    )
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);
    const OfferViewStates = offer.group;
    console(point, destination, offerGroup);

    return {
      date: formatDate(point.startDate),
      icon: pointIconMap(point.type),
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      offer: []
      // TODO: доделать
    }


  }
}
