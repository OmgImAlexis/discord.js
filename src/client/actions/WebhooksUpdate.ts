'use strict';

import Action from './Action';
import { Events } from '../../util/Constants';

class WebhooksUpdate extends Action {
  handle(data) {
    const client = this.client;
    const channel = client.channels.cache.get(data.channel_id);
    /**
     * Emitted whenever a guild text channel has its webhooks changed.
     * @event Client#webhookUpdate
     * @param {TextChannel} channel The channel that had a webhook update
     */
    if (channel) client.emit(Events.WEBHOOKS_UPDATE, channel);
  }
}

export default WebhooksUpdate;
