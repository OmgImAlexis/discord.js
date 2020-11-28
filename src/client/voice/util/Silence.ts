'use strict';

import { Readable } from 'stream';

const SILENCE_FRAME = Buffer.from([0xf8, 0xff, 0xfe]);

class Silence extends Readable {
  _read() {
    this.push(SILENCE_FRAME);
  }
}

export default Silence;
