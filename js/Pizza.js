import configurations from "../database/configurations.js";
import { Data } from "./Data.js";
import { PizzaSize } from "./PizzaSize.js";
import { PizzaSizes } from "./PizzaSizes.js";
import { Price } from "./Price.js";
import { Prices } from "./Prices.js";
import { Topping } from "./Topping.js";
import { Toppings } from "./Toppings.js";

/**
 * @typedef {{
 *   id: string;
 *   slug: string;
 *   name: string;
 *   description: string;
 *   prices: import("./Prices.js").Json;
 *   image_path: string;
 * }} Json
 */
export class Pizza extends Data {
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

  /** @type {Json["image_path"]} */
  image_path;

  /**
   * @type {PizzaSizes}
   * @protected
   */
  allowedSizes = [];

  /**
   * @type {PizzaSize | undefined}
   * @protected
   */
  size;

  /**
   * @type {Toppings}
   * @protected
   */
  allowedToppings = [];

  /**
   * @type {Toppings}
   * @protected
   */
  toppings = [];

  /**
   * @param {Json} data
   */
  constructor(data) {
    super();

    const { id, slug, name, description, prices, image_path } = data;

    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.prices = new Prices(prices);
    this.image_path = image_path;
  }

  /**
   * @param {Pizza | Json} data
   */
  static create(data) {
    if (data instanceof this) {
      return data;
    }

    if (typeof data === "object") {
      return new this(data);
    }

    throw new Error(`Parameter of pizza must be an instance of ${Pizza.name}.`);
  }

  /**
   * @param {Pizza["allowedSizes"] | Array<PizzaSize> | Array<import("./PizzaSize.d.ts").Json>} sizes
   */
  setAllowedSizes(sizes) {
    this.allowedSizes = PizzaSizes.create(sizes);

    return this;
  }

  /**
   * @param {Pizza["size"] | import("./PizzaSize.d.ts").Json} size
   */
  setSize(size) {
    this.isSizeAllowed(size);

    this.size = PizzaSize.create(size);

    return this;
  }

  /**
   * @param {Pizza["allowedToppings"] | Array<Topping> | Array<import("./Topping.d.ts").Json>} toppings
   */
  setAllowedToppings(toppings) {
    this.allowedToppings = Toppings.create(toppings);

    return this;
  }

  /**
   * @param {Topping | import("./Topping.d.ts").Json} topping
   */
  addTopping(topping) {
    this.isToppingAllowed(topping);

    this.toppings.push(Topping.create(topping));

    return this;
  }

  /**
   * @param {PizzaSize | import("./PizzaSize.d.ts").Json} size
   */
  isSizeAllowed(size, throwError = true) {
    size = PizzaSize.create(size);

    const isAllowed = this.allowedSizes.some(
      allowedSize => allowedSize.name === size.name
    );

    if (!isAllowed && throwError) {
      throw new Error(
        `Size ${size.name} is now allowed on the ${this.name} pizza.`
      );
    }

    return isAllowed;
  }

  /**
   * @param {Topping | import("./Topping.d.ts").Json} topping
   */
  isToppingAllowed(topping, throwError = true) {
    topping = Topping.create(topping);

    const isAllowed = this.allowedToppings.some(
      allowedTopping => allowedTopping.name === topping.name
    );

    if (!isAllowed && throwError) {
      throw new Error(
        `Topping ${topping.name} is now allowed on the ${this.name} pizza.`
      );
    }

    return isAllowed;
  }

  /**
   * @param {Price["currency"]} currency
   */
  calculatePrice(currency) {
    currency ||= String(
      configurations.find(configuration => configuration.key === "currency")
        ?.value || "USD"
    );

    Price.isCurrencyAllowed(currency);

    let total = this.prices.getValueFromCurrency(currency);

    if (this.size !== undefined) {
      total += this.size.prices.getValueFromCurrency(currency);
    }

    return total;
  }
}
