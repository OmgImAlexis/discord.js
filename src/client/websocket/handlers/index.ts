'use strict';

import { WSEvents } from '../../../util/Constants';

const handlers = {};

for (const name of Object.keys(WSEvents)) {
  try {
    handlers[name] = require(`./${name}.js`);
  } catch {} // eslint-disable-line no-empty
}

export default handlers;
