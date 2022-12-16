import View from './views';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import PointDestinationView from './common/point-destination-view';
import PointTimeView from './common/point-time-view';
import PointPriceView from './common/point-price-view';
import OffersView from './common/offers-view';
import DestinationView from './common/destination-view';

export default class NewPointEditorView extends View {
  constructor() {
    super();

    this.classList.add('trip-events__item');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <${PointTypeView}></${PointTypeView}>
        <${PointDestinationView}></${PointDestinationView}>
        <${PointTimeView}></${PointTimeView}>
        <${PointPriceView}></${PointPriceView}>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <${OffersView}></${OffersView}>
        <${DestinationView}></${DestinationView}>
      </section>
    </form>
    `;
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
