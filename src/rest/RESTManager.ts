'use strict';

import type { FIXME } from '../types';
import APIRequest from './APIRequest';
import routeBuilder from './APIRouter';
import RequestHandler from './RequestHandler';
import { Error } from '../errors';
import Collection from '../util/Collection';
import { Endpoints } from '../util/Constants';

class RESTManager {
  client: FIXME;
  handlers: FIXME;
  tokenPrefix: FIXME;
  versioned: FIXME;
  globalTimeout: FIXME;

  constructor(client, tokenPrefix = 'Bot') {
    this.client = client;
    this.handlers = new Collection();
    this.tokenPrefix = tokenPrefix;
    this.versioned = true;
    this.globalTimeout = null;
    if (client.options.restSweepInterval > 0) {
      client.setInterval(() => {
        this.handlers.sweep(handler => handler._inactive);
      }, client.options.restSweepInterval * 1000);
    }
  }

  get api() {
    return routeBuilder(this);
  }

  getAuth() {
    const token = this.client.token || this.client.accessToken;
    if (token) return `${this.tokenPrefix} ${token}`;
    throw new Error('TOKEN_MISSING');
  }

  get cdn() {
    return Endpoints.CDN(this.client.options.http.cdn);
  }

  request(method, url, options = {}) {
    const apiRequest = new APIRequest(this, method, url, options);
    let handler = this.handlers.get(apiRequest.route);

    if (!handler) {
      handler = new RequestHandler(this);
      this.handlers.set(apiRequest.route, handler);
    }

    return handler.push(apiRequest);
  }

  get endpoint() {
    return this.client.options.http.api;
  }

  set endpoint(endpoint) {
    this.client.options.http.api = endpoint;
  }
}

export default RESTManager;
