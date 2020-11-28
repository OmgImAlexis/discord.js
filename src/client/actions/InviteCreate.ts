'use strict';

import Action from './Action';
import Invite from '../../structures/Invite';
import { Events } from '../../util/Constants';

class InviteCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const channel = client.channels.cache.get(data.channel_id);
    const guild = client.guilds.cache.get(data.guild_id);
    if (!channel) return false;

    const inviteData = Object.assign(data, { channel, guild });
    const invite = new Invite(client, inviteData);
    /**
     * Emitted when an invite is created.
     * <info> This event only triggers if the client has `MANAGE_GUILD` permissions for the guild,
     * or `MANAGE_CHANNEL` permissions for the channel.</info>
     * @event Client#inviteCreate
     * @param {Invite} invite The invite that was created
     */
    client.emit(Events.INVITE_CREATE, invite);
    return { invite };
  }
}

export default InviteCreateAction;
