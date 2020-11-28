'use strict';

export default (client, packet) => {
  client.actions.GuildIntegrationsUpdate.handle(packet.d);
};
