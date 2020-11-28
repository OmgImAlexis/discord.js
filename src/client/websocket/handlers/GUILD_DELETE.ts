'use strict';

export default (client, packet) => {
  client.actions.GuildDelete.handle(packet.d);
};
