import { Collection } from "./Collection.js";
import { Topping } from "./Topping.js";

/**
 * @extends {Collection<Topping>}
 * @typedef {Array<import("./Topping.js").Json>} Json
 */
export class Toppings extends Collection {
  /**
   * @param {Array<Topping> & Json} collection
   */
  constructor(collection) {
    super(collection, Topping);
  }

  /**
   * @param {Toppings & Array<Topping> & Json} collection
   * @returns {Toppings}
   */
  static create(collection) {
    // @ts-ignore
    return Collection.create(collection, Topping);
  }
}
