'use strict';

export default (client, packet) => {
  client.actions.VoiceStateUpdate.handle(packet.d);
};
