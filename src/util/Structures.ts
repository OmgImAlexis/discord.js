'use strict';

import GuildEmoji from '../structures/GuildEmoji';
import DMChannel from '../structures/DMChannel';
import TextChannel from '../structures/TextChannel';
import VoiceChannel from '../structures/VoiceChannel';
import CategoryChannel from '../structures/CategoryChannel';
import NewsChannel from '../structures/NewsChannel';
import StoreChannel from '../structures/StoreChannel';
import GuildMember from '../structures/GuildMember';
import Guild from '../structures/Guild';
import Message from '../structures/Message';
import MessageReaction from '../structures/MessageReaction';
import { Presence } from '../structures/Presence';
import ClientPresence from '../structures/ClientPresence';
import VoiceState from '../structures/VoiceState';
import Role from '../structures/Role';
import User from '../structures/User';

const structures = {
  GuildEmoji,
  DMChannel,
  TextChannel,
  VoiceChannel,
  CategoryChannel,
  NewsChannel,
  StoreChannel,
  GuildMember,
  Guild,
  Message,
  MessageReaction,
  Presence,
  ClientPresence,
  VoiceState,
  Role,
  User
};

/**
 * An extendable structure:
 * * **`GuildEmoji`**
 * * **`DMChannel`**
 * * **`TextChannel`**
 * * **`VoiceChannel`**
 * * **`CategoryChannel`**
 * * **`NewsChannel`**
 * * **`StoreChannel`**
 * * **`GuildMember`**
 * * **`Guild`**
 * * **`Message`**
 * * **`MessageReaction`**
 * * **`Presence`**
 * * **`ClientPresence`**
 * * **`VoiceState`**
 * * **`Role`**
 * * **`User`**
 * @typedef {string} ExtendableStructure
 */

/**
 * Allows for the extension of built-in Discord.js structures that are instantiated by {@link BaseManager Managers}.
 */
class Structures {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Retrieves a structure class.
   * @param {string} structure Name of the structure to retrieve
   * @returns {Function}
   */
  static get(structure) {
    if (typeof structure === 'string') return structures[structure];
    throw new TypeError(`"structure" argument must be a string (received ${typeof structure})`);
  }

  /**
   * Extends a structure.
   * <warn> Make sure to extend all structures before instantiating your client.
   * Extending after doing so may not work as expected. </warn>
   * @param {ExtendableStructure} structure Name of the structure class to extend
   * @param {Function} extender Function that takes the base class to extend as its only parameter and returns the
   * extended class/prototype
   * @returns {Function} Extended class/prototype returned from the extender
   * @example
   * const { Structures } = require('discord.js');
   *
   * Structures.extend('Guild', Guild => {
   *   class CoolGuild extends Guild {
   *     constructor(client, data) {
   *       super(client, data);
   *       this.cool = true;
   *     }
   *   }
   *
   *   return CoolGuild;
   * });
   */
  static extend(structure, extender) {
    if (!structures[structure]) throw new RangeError(`"${structure}" is not a valid extensible structure.`);
    if (typeof extender !== 'function') {
      const received = `(received ${typeof extender})`;
      throw new TypeError(
        `"extender" argument must be a function that returns the extended structure class/prototype ${received}.`,
      );
    }

    const extended = extender(structures[structure]);
    if (typeof extended !== 'function') {
      const received = `(received ${typeof extended})`;
      throw new TypeError(`The extender function must return the extended structure class/prototype ${received}.`);
    }

    if (!(extended.prototype instanceof structures[structure])) {
      const prototype = Object.getPrototypeOf(extended);
      const received = `${extended.name || 'unnamed'}${prototype.name ? ` extends ${prototype.name}` : ''}`;
      throw new Error(
        'The class/prototype returned from the extender function must extend the existing structure class/prototype' +
          ` (received function ${received}; expected extension of ${structures[structure].name}).`,
      );
    }

    structures[structure] = extended;
    return extended;
  }
}

export default Structures;
