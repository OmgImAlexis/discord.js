'use strict';

import BaseClient from './BaseClient';
import Webhook from '../structures/Webhook';
import type Snowflake from '../util/Snowflake';

/**
 * The webhook client.
 * @implements {Webhook}
 * @extends {BaseClient}
 */
class WebhookClient extends BaseClient {
  id: Snowflake;

  /**
   * @param {Snowflake} id ID of the webhook
   * @param {string} token Token of the webhook
   * @param {ClientOptions} [options] Options for the client
   * @example
   * // Create a new webhook and send a message
   * const hook = new Discord.WebhookClient('1234', 'abcdef');
   * hook.send('This will send a message').catch(console.error);
   */
  constructor(id: Snowflake, token: string, options) {
    super(options);
    Object.defineProperty(this, 'client', { value: this });
    this.id = id;
    Object.defineProperty(this, 'token', { value: token, writable: true, configurable: true });
  }
}

Webhook.applyToClass(WebhookClient);

export default WebhookClient;
