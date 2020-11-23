'use strict';

import type { FIXME } from '../types';

// Heavily inspired by node's `internal/errors` module

const kCode = Symbol('code').toString();
const messages = new Map();

/**
 * Extend an error of some sort into a DiscordjsError.
 * @param {Error} Base Base error to extend
 * @returns {DiscordjsError}
 */
function makeDiscordjsError(Base) {
  return class DiscordjsError extends Base {
    [key: string]: FIXME;

    constructor(key, ...args) {
      super(message(key, args));
      this[kCode] = key;
      if (Error.captureStackTrace) Error.captureStackTrace(this, DiscordjsError);
    }

    get name() {
      return `${super.name} [${this[kCode]}]`;
    }

    get code() {
      return this[kCode];
    }
  };
}

/**
 * Format the message for an error.
 * @param {string} key Error key
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 */
function message(key, args) {
  if (typeof key !== 'string') throw new Error('Error message key must be a string');
  const msg = messages.get(key);
  if (!msg) throw new Error(`An invalid error message key was used: ${key}.`);
  if (typeof msg === 'function') return msg(...args);
  if (args === undefined || args.length === 0) return msg;
  args.unshift(msg);
  return String(...args);
}

/**
 * Register an error code and message.
 * @param {string} sym Unique name for the error
 * @param {*} val Value of the error
 */
export const register = (sym, val) => {
  messages.set(sym, typeof val === 'function' ? val : String(val));
};

export const Error = makeDiscordjsError(global.Error);
export const TypeError = makeDiscordjsError(global.TypeError);
export const RangeError = makeDiscordjsError(global.RangeError);
