'use strict';

export default (client, packet) => {
  client.actions.InviteCreate.handle(packet.d);
};
