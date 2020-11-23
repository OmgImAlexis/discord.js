'use strict';

import Collection from './Collection';

/**
 * A Collection which holds a max amount of entries. The first key is deleted if the Collection has
 * reached max size.
 * @extends {Collection}
 * @param {number} [maxSize=0] The maximum size of the Collection
 * @param {Iterable} [iterable=null] Optional entries passed to the Map constructor.
 * @private
 */
class LimitedCollection<K, V> extends Collection<K, V> {
  /**
   * The max size of the Collection.
   * @type {number}
   */
  maxSize: number;

  constructor(maxSize = 0, iterable = null) {
    super(iterable);
    this.maxSize = maxSize;
  }

  set(key, value) {
    if (this.maxSize === 0) return this;
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    if (this.size >= this.maxSize && !this.has(key)) this.delete(this.firstKey());
    return super.set(key, value);
  }

  get [Symbol.species]() {
    return Collection;
  }
}

export default LimitedCollection;
