'use strict';

import Action from './Action';
import { Events } from '../../util/Constants';

class ChannelCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const existing = client.channels.cache.has(data.id);
    const channel = client.channels.add(data);
    if (!existing && channel) {
      /**
       * Emitted whenever a channel is created.
       * @event Client#channelCreate
       * @param {DMChannel|GuildChannel} channel The channel that was created
       */
      client.emit(Events.CHANNEL_CREATE, channel);
    }
    return { channel };
  }
}

export default ChannelCreateAction;
