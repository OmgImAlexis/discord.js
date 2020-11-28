'use strict';

import Action from './Action';
import DMChannel from '../../structures/DMChannel';
import { Events } from '../../util/Constants';
import type { FIXME } from '../../types';

class ChannelDeleteAction extends Action {
  deleted: FIXME;

  constructor(client) {
    super(client);
    this.deleted = new Map();
  }

  handle(data) {
    const client = this.client;
    let channel = client.channels.cache.get(data.id);

    if (channel) {
      client.channels.remove(channel.id);
      channel.deleted = true;
      if (channel.messages && !(channel instanceof DMChannel)) {
        for (const message of channel.messages.cache.values()) {
          message.deleted = true;
        }
      }
      /**
       * Emitted whenever a channel is deleted.
       * @event Client#channelDelete
       * @param {DMChannel|GuildChannel} channel The channel that was deleted
       */
      client.emit(Events.CHANNEL_DELETE, channel);
    }

    return { channel };
  }
}

export default ChannelDeleteAction;
