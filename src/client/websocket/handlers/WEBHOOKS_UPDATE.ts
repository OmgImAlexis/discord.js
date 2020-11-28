'use strict';

export default (client, packet) => {
  client.actions.WebhooksUpdate.handle(packet.d);
};
