/**
 * @abstract
 * @template {{ }} T
 * @extends {Array<T>}
 */
export class Collection extends Array {
  /**
   * @param {Array<T>} collection
   * @param {Object} dataClass
   */
  constructor(collection, dataClass) {
    if (!Array.isArray(collection)) {
      super();
    } else {
      if (collection.every(data => data instanceof dataClass)) {
        super(...collection);
      } else if (collection.every(data => typeof data === "object")) {
        super(...collection.map(data => new dataClass(data)));
      } else {
        super();
      }
    }
  }

  /**
   * @param {Collection<{ }> & Array<{ }>} collection
   * @param {Object} dataClass
   * @throws {Error}
   */
  static create(collection, dataClass) {
    if (
      collection instanceof this &&
      collection.every(data => data instanceof dataClass)
    ) {
      return collection;
    }

    if (!Array.isArray(collection)) {
      throw new Error(
        `Elements of collection must be an instance of ${this.name} or an array containing ${dataClass.name} object.`
      );
    }

    return new this(collection);
  }
}
