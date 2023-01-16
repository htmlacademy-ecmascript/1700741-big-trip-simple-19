import View from './views';
import {html} from '../utils';
import PointTypeView from './common/point-type-view';
import PointTimeView from './common/point-time-view';
import PointPriceView from './common/point-price-view';
import OffersView from './common/offers-view';
import DestinationView from './common/destination-view';
import DestinationDetailsView from './common/destination-detail-view';
import { saveButtonTextMap } from '../maps';

/**
 * @implements {EventListenerObject}
 */
export default class NewPointEditorView extends View {
  constructor(listView) {
    super();

    this.classList.add('trip-events__item');

    /**
     * @type {ListView}
     */
    this.listView = listView;

    /**
     * @type {PointTypeView}
     */
    this.pointTypeView = this.querySelector(String(PointTypeView));

    /**
     * @type {DestinationView}
     */
    this.destinationView = this.querySelector(String(DestinationView));


    /**
     * @type {OffersView}
     */
    this.offersView = this.querySelector(String(OffersView));

    /**
     * @type {DestinationDetailsView}
     */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <${PointTypeView}></${PointTypeView}>
          <${DestinationView}></${DestinationView}>
          <${PointTimeView}></${PointTimeView}>
          <${PointPriceView}></${PointPriceView}>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <${OffersView}></${OffersView}>
          <${DestinationDetailsView}></${DestinationDetailsView}>
        </section>
      </form>
    `;
  }

  open() {
    this.listView.prepend(this);
    document.addEventListener('keydown', this);
  }

  close(notify = true) {
    this.remove();
    document.removeEventListener('keydown', this);

    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }
  }

  /**
   * @param {Boolean} flag
   */
  awaitSave(flag) {
    const text = saveButtonTextMap[Number(flag)];

    this.querySelector('.event__save-btn').textContent = text;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
