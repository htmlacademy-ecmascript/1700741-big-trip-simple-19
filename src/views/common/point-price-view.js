import View from '../views';
import {html} from '../../utils';

export default class PointPriceView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--price');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
    `;
  }
}

customElements.define(String(PointPriceView), PointPriceView);
