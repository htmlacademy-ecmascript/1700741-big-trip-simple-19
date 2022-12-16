import Adapter from './adapter';

export default class OfferGroupAdaptor extends Adapter {
  /**
   * @param {Partial<OfferGroup>} data;
   */
  constructor(data) {
    super();

    this.type = data.type;
    this.items = data.offers.map((value) => (value));
  }

  /**
   * @override
   * @return {Partial<OfferGroup>}
   */
  toJSON() {
    return {
      'type': this.type,
      'offers': this.items.map((value) => (value))
    };
  }
}
