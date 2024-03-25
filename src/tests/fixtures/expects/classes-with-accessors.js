/*
 * Source file for testing that the program documents a class's accessors.
 */

class Thing {
  _size = 0;

  /**
   * @returns {number}
   */
  get size() {
    return this._size;
  }

  /**
   * @param {string | number | boolean} value
   */
  set size(value) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}
