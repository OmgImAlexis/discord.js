'use strict';

export default (client, packet, shard) => {
  client.actions.GuildMemberRemove.handle(packet.d, shard);
};
