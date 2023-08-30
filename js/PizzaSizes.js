import { Collection } from "./Collection.js";
import { PizzaSize } from "./PizzaSize.js";

/**
 * @extends {Collection<PizzaSize>}
 * @typedef {Array<import("./PizzaSize.js").Json>} Json
 */
export class PizzaSizes extends Collection {
  /**
   * @param {Array<PizzaSize> | Json} collection
   */
  constructor(collection) {
    super(collection, PizzaSize);
  }

  /**
   * @param {PizzaSizes | Array<PizzaSize> | Json} collection
   */
  static create(collection) {
    return Collection.create(collection, PizzaSize);
  }
}
