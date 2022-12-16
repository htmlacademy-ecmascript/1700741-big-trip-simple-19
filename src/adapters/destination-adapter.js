import Adapter from './adapter';

export default class DestinationAdaptor extends Adapter {
  /**
   * @param {Partial<Destination>} data;
   */
  constructor(data) {
    super();

    this.id = String(data.id);
    this.description = data.description;
    this.name = data.name;
    this.pictures = data.pictures?.map((item) => ({...item}));
  }

  /**
   * @override
   * @return {Partial<Destination>}
   */
  toJSON() {
    return {
      'id': Number(this.id),
      'description': this.description,
      'name': this.name,
      'pictures': this.pictures.map((item) => ({...item}))
    };
  }
}
