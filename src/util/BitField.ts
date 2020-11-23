'use strict';

import type { FIXME } from '../types';

const { RangeError: DiscordRangeError } = require('../errors');

/**
 * Data structure that makes it easy to interact with a bitfield.
 */
class BitField {
  static FLAGS: FIXME;
  bitfield: FIXME;

  /**
   * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
   */
  constructor(bits) {
    /**
     * Bitfield of the packed bits
     * @type {number}
     */
    this.bitfield = BitField.resolve(bits);
  }

  /**
   * Checks whether the bitfield has a bit, or any of multiple bits.
   * @param {BitFieldResolvable} bit Bit(s) to check for
   * @returns {boolean}
   */
  any(bit) {
    return (this.bitfield & BitField.resolve(bit)) !== 0;
  }

  /**
   * Checks if this bitfield equals another
   * @param {BitFieldResolvable} bit Bit(s) to check for
   * @returns {boolean}
   */
  equals(bit) {
    return this.bitfield === BitField.resolve(bit);
  }

  /**
   * Checks whether the bitfield has a bit, or multiple bits.
   * @param {BitFieldResolvable} bit Bit(s) to check for
   * @returns {boolean}
   */
  has(bit) {
    if (Array.isArray(bit)) return bit.every(p => this.has(p));
    bit = BitField.resolve(bit);
    return (this.bitfield & bit) === bit;
  }

  /**
   * Gets all given bits that are missing from the bitfield.
   * @param {BitFieldResolvable} bits Bit(s) to check for
   * @param {...*} hasParams Additional parameters for the has method, if any
   * @returns {string[]}
   */
  missing(bits, ...hasParams) {
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    if (!Array.isArray(bits)) bits = new this.constructor(bits).toArray(false);
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    return bits.filter(p => !this.has(p, ...hasParams));
  }

  /**
   * Freezes these bits, making them immutable.
   * @returns {Readonly<BitField>} These bits
   */
  freeze() {
    return Object.freeze(this);
  }

  /**
   * Adds bits to these ones.
   * @param {...BitFieldResolvable} [bits] Bits to add
   * @returns {BitField} These bits or new BitField if the instance is frozen.
   */
  add(...bits) {
    let total = 0;
    for (const bit of bits) {
      // @TODO: Remove the need for the following ts-expect-error
      // @ts-expect-error
      total |= this.constructor.resolve(bit);
    }
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    if (Object.isFrozen(this)) return new this.constructor(this.bitfield | total);
    this.bitfield |= total;
    return this;
  }

  /**
   * Removes bits from these.
   * @param {...BitFieldResolvable} [bits] Bits to remove
   * @returns {BitField} These bits or new BitField if the instance is frozen.
   */
  remove(...bits) {
    let total = 0;
    for (const bit of bits) {
      // @TODO: Remove the need for the following ts-expect-error
      // @ts-expect-error
      total |= this.constructor.resolve(bit);
    }
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    if (Object.isFrozen(this)) return new this.constructor(this.bitfield & ~total);
    this.bitfield &= ~total;
    return this;
  }

  /**
   * Gets an object mapping field names to a {@link boolean} indicating whether the
   * bit is available.
   * @param {...*} hasParams Additional parameters for the has method, if any
   * @returns {Object}
   */
  serialize(...hasParams) {
    const serialized = {};
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    for (const [flag, bit] of Object.entries(this.constructor.FLAGS)) serialized[flag] = this.has(bit, ...hasParams);
    return serialized;
  }

  /**
   * Gets an {@link Array} of bitfield names based on the bits available.
   * @param {...*} hasParams Additional parameters for the has method, if any
   * @returns {string[]}
   */
  toArray(...hasParams) {
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    return Object.keys(this.constructor.FLAGS).filter(bit => this.has(bit, ...hasParams));
  }

  toJSON() {
    return this.bitfield;
  }

  valueOf() {
    return this.bitfield;
  }

  *[Symbol.iterator]() {
    yield* this.toArray();
  }

  /**
   * Data that can be resolved to give a bitfield. This can be:
   * * A string (see {@link BitField.FLAGS})
   * * A bit number
   * * An instance of BitField
   * * An Array of BitFieldResolvable
   * @typedef {string|number|BitField|BitFieldResolvable[]} BitFieldResolvable
   */

  /**
   * Resolves bitfields to their numeric form.
   * @param {BitFieldResolvable} [bit=0] - bit(s) to resolve
   * @returns {number}
   */
  static resolve(bit = 0) {
    if (typeof bit === 'number' && bit >= 0) return bit;
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    if (bit instanceof BitField) return bit.bitfield;
    if (Array.isArray(bit)) return bit.map(p => this.resolve(p)).reduce((prev, p) => prev | p, 0);
    if (typeof bit === 'string' && typeof this.FLAGS[bit] !== 'undefined') return this.FLAGS[bit];
    const error = new DiscordRangeError('BITFIELD_INVALID');
    error.bit = bit;
    throw error;
  }
}

/**
 * Numeric bitfield flags.
 * <info>Defined in extension classes</info>
 * @type {Object}
 * @abstract
 */
BitField.FLAGS = {};

export default BitField;
