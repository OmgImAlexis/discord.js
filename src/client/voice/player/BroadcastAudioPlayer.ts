'use strict';

import BasePlayer from './BasePlayer';
import BroadcastDispatcher from '../dispatcher/BroadcastDispatcher';
import type VoiceBroadcast from '../VoiceBroadcast';

/**
 * An Audio Player for a Voice Connection.
 * @private
 * @extends {BasePlayer}
 */
class AudioPlayer extends BasePlayer {
  broadcast: VoiceBroadcast;

  constructor(broadcast: VoiceBroadcast) {
    super();
    /**
     * The broadcast that the player serves
     * @type {VoiceBroadcast}
     */
    this.broadcast = broadcast;
  }

  createDispatcher(options, streams) {
    this.destroyDispatcher();
    const dispatcher = (this.dispatcher = new BroadcastDispatcher(this, options, streams));
    return dispatcher;
  }
}

export default AudioPlayer;
