import dayjs from 'dayjs';
import { escape } from 'he';

/**
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 */
export const html = (strings, ...values) => strings.reduce((before, after, index) => {
  const value = values[index - 1];

  return before + escape(String(value)) + after;
});


/**
 * @param {string} value
 */
export formatDate = (value) => dayjs(value).format('MMM - DD');


/**
 * @param {string} value
 */

export formatTime = (value) => dayjs(value).format('HH:mm');

/**
 * @param {number} value
 */

export formatNumber = (value) => value.toLocateString('en');


