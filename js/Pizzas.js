import { Collection } from "./Collection.js";
import { Pizza } from "./Pizza.js";

/**
 * @extends {Collection<Pizza>}
 * @typedef {Array<import("./Pizza.js").Json>} Json
 */
export class Pizzas extends Collection {
  /**
   * @param {Array<Pizza> & Json} collection
   */
  constructor(collection) {
    super(collection, Pizza);
  }

  /**
   * @param {Pizzas & Array<Pizza> & Json} collection
   * @returns {Pizzas}
   */
  static create(collection) {
    // @ts-ignore
    return Collection.create(collection, Pizza);
  }
}
