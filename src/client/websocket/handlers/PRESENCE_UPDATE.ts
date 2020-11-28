'use strict';

export default (client, packet) => {
  client.actions.PresenceUpdate.handle(packet.d);
};
