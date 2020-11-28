'use strict';

import { URLSearchParams } from 'url';
import type { FIXME } from '../types';
import * as https from 'https';
import * as FormData from '@discordjs/form-data';
import AbortController from 'abort-controller';
import fetch from 'node-fetch';
import { browser, UserAgent } from '../util/Constants';

if (https.Agent) var agent = new https.Agent({ keepAlive: true });

class APIRequest {
  client: FIXME;
  route: FIXME;
  options: FIXME;
  retries: FIXME;
  path: FIXME;

  constructor(public rest, public method, path, options) {
    this.client = rest.client;
    this.route = options.route;
    this.options = options;
    this.retries = 0;

    let queryString = '';
    if (options.query) {
      const query = Object.entries(options.query)
        // @TODO: Remove the need for the following ts-expect-error
        // @ts-expect-error
        .filter(([, value]) => ![null, 'null', 'undefined'].includes(value) && typeof value !== 'undefined')
        .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));

      // @TODO: Remove the need for the following ts-expect-error
      // @ts-expect-error
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${queryString && `?${queryString}`}`;
  }

  make() {
    const API =
      this.options.versioned === false
        ? this.client.options.http.api
        : `${this.client.options.http.api}/v${this.client.options.http.version}`;
    const url = API + this.path;
    let headers: FIXME = {};

    if (this.options.auth !== false) headers.Authorization = this.rest.getAuth();
    if (this.options.reason) headers['X-Audit-Log-Reason'] = encodeURIComponent(this.options.reason);
    if (!browser) headers['User-Agent'] = UserAgent;
    if (this.options.headers) headers = Object.assign(headers, this.options.headers);

    let body;
    if (this.options.files && this.options.files.length) {
      body = new FormData();
      for (const file of this.options.files) if (file && file.file) body.append(file.name, file.file, file.name);
      if (typeof this.options.data !== 'undefined') body.append('payload_json', JSON.stringify(this.options.data));
      if (!browser) headers = Object.assign(headers, body.getHeaders());
      // eslint-disable-next-line eqeqeq
    } else if (this.options.data != null) {
      body = JSON.stringify(this.options.data);
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = this.client.setTimeout(() => controller.abort(), this.client.options.restRequestTimeout);
    return fetch(url, {
      method: this.method,
      headers,
      agent,
      body,
      signal: controller.signal,
    }).finally(() => this.client.clearTimeout(timeout));
  }
}

export default APIRequest;
