import { Collection } from "./Collection.js";
import { Price } from "./Price.js";

/**
 * @extends {Collection<Price>}
 * @typedef {Array<import("./Price.js").Json>} Json
 */
export class Prices extends Collection {
  /**
   * @param {Array<Price> & Json} collection
   */
  constructor(collection) {
    super(collection, Price);
  }

  /**
   * @param {Prices & Array<Price> & Json} collection
   * @returns {Prices}
   */
  static create(collection) {
    // @ts-ignore
    return Collection.create(collection, Price);
  }

  /**
   * @param {Price["currency"]} currency
   */
  findFromCurrency(currency) {
    Price.isCurrencyAllowed(currency);

    return this.find(price => price.currency === currency);
  }

  /**
   * @param {Price["currency"]} currency
   */
  getValueFromCurrency(currency) {
    return this.findFromCurrency(currency)?.value || 0;
  }
}
