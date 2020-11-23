'use strict';

import * as DJSError from './DJSError';
import { Messages } from './Messages';

export default DJSError;
export const Error = DJSError.Error;
export const RangeError = DJSError.RangeError;
export const TypeError = DJSError.TypeError;
export {
    Messages
};
