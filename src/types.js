/**
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {string} type
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Picture[]} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @template Item
 * @typedef {import('./store').default<Item>} Store
 */

/**
 * @typedef {import('./adapters/adapter').default} Adapter
 * @typedef {import('./adapters/point-adapterV').default} PointAdapter
 * @typedef {import('./adapters/destination-adapter').default} DestinationAdapter
 * @typedef {import('./adapters/offer-group-adapter').default} OfferGroupAdapter
 */
