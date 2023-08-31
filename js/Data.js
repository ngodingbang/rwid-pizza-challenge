/**
 * @abstract
 */
export class Data {
  /**
   * @param {Object} data
   * @param {Object} dataClass
   * @throws {Error}
   */
  static create(data, dataClass) {
    if (data instanceof dataClass) {
      return data;
    }

    if (typeof data === "object") {
      return new dataClass(data);
    }

    throw new Error(
      `Parameter of data must be an instance of ${dataClass.name}.`
    );
  }
}
