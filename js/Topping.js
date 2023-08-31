import { Data } from "./Data.js";
import { Prices } from "./Prices.js";

/**
 * @typedef {{
 *   id: string;
 *   slug: string;
 *   name: string;
 *   description: string;
 *   prices: import("./Prices.js").Json;
 * }} Json
 */
export class Topping extends Data {
  /** @type {Json["id"]} */
  id;

  /** @type {Json["slug"]} */
  slug;

  /** @type {Json["name"]} */
  name;

  /** @type {Json["description"]} */
  description;

  /** @type {Prices} */
  prices;

  /**
   * @param {Json} data
   */
  constructor(data) {
    super();

    const { id, slug, name, description, prices } = data;

    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.prices = new Prices(prices);
  }

  /**
   * @param {Topping & Json} data
   */
  static create(data) {
    return Data.create(data);
  }
}
