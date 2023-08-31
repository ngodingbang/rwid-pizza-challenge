import { Data } from "./Data.js";

/**
 * @typedef {{
 *   currency: "USD" | "IDR" | string;
 *   value: number;
 * }} Json
 */
export class Price extends Data {
  /** @type {Array<Price["currency"]>} */
  static allowedCurrency = ["USD", "IDR"];

  /** @type {Json["currency"]} */
  currency;

  /** @type {Json["value"]} */
  value;

  /**
   * @param {Json} data
   */
  constructor(data) {
    super();

    const { currency, value } = data;

    Price.isCurrencyAllowed(currency);
    Price.isValueAllowed(value);

    this.currency = currency;
    this.value = Number(value);
  }

  /**
   * @param {Price & Json} data
   */
  static create(data) {
    return Data.create(data);
  }

  /**
   * @param {string} currency
   * @param {boolean} [throwError=true]
   * @throws {Error}
   */
  static isCurrencyAllowed(currency, throwError = true) {
    const isAllowed = Price.allowedCurrency.includes(currency);

    if (!isAllowed && throwError) {
      throw new Error(
        `Parameter of currency must be [${Price.allowedCurrency.join(", ")}].`
      );
    }

    return isAllowed;
  }

  /**
   * @param {*} value
   * @param {boolean} [throwError=true]
   * @throws {Error}
   */
  static isValueAllowed(value, throwError = true) {
    const isAllowed = !Number.isNaN(value);

    if (!isAllowed && throwError) {
      throw new Error(`Parameter of value must be a number.`);
    }

    return isAllowed;
  }
}
