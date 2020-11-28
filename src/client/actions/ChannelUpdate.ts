'use strict';

import Action from './Action';
import Channel from '../../structures/Channel';
import { ChannelTypes } from '../../util/Constants';

class ChannelUpdateAction extends Action {
  handle(data) {
    const client = this.client;

    let channel = client.channels.cache.get(data.id);
    if (channel) {
      const old = channel._update(data);

      if (ChannelTypes[channel.type.toUpperCase()] !== data.type) {
        const newChannel = Channel.create(this.client, data, channel.guild);
        for (const [id, message] of channel.messages.cache) newChannel.messages.cache.set(id, message);
        newChannel._typing = new Map(channel._typing);
        channel = newChannel;
        this.client.channels.cache.set(channel.id, channel);
      }

      return {
        old,
        updated: channel,
      };
    }

    return {};
  }
}

export default ChannelUpdateAction;
