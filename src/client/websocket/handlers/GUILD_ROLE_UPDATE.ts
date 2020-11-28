'use strict';

export default (client, packet) => {
  client.actions.GuildRoleUpdate.handle(packet.d);
};
