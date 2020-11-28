'use strict';

export default (client, packet) => {
  client.actions.InviteDelete.handle(packet.d);
};
