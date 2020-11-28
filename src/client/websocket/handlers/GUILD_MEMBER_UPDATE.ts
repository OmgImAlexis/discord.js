'use strict';

export default (client, packet, shard) => {
  client.actions.GuildMemberUpdate.handle(packet.d, shard);
};
