'use strict';

export default (client, packet) => {
  client.actions.GuildBanRemove.handle(packet.d);
};
