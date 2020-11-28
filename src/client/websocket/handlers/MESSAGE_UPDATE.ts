'use strict';

import { Events } from '../../../util/Constants';

export default (client, packet) => {
  const { old, updated } = client.actions.MessageUpdate.handle(packet.d);
  if (old && updated) {
    /**
     * Emitted whenever a message is updated - e.g. embed or content change.
     * @event Client#messageUpdate
     * @param {Message} oldMessage The message before the update
     * @param {Message} newMessage The message after the update
     */
    client.emit(Events.MESSAGE_UPDATE, old, updated);
  }
};
