'use strict';

import BaseCollection from '@discordjs/collection';
import Util from './Util';

class Collection<K, V> extends BaseCollection<K, V> {
  toJSON() {
    // @TODO: Remove the need for the following ts-expect-error
    // @ts-expect-error
    return this.map(e => (typeof e.toJSON === 'function' ? e.toJSON() : Util.flatten(e)));
  }
}

export default Collection;

/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/collection/master/class/Collection}
 */
