import { format } from 'date-fns';
import { sl } from 'date-fns/locale';

export const isEmpty = x => {
  if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
    return x.length === 0;
  }

  if (x instanceof Map || x instanceof Set) {
    return x.size === 0;
  }

  if ({}.toString.call(x) === '[object Object]') {
    return Object.keys(x).length === 0;
  }

  return false;
};

export const isNull = x => x === null;

export const isUndefined = x => typeof x === 'undefined';

export const isNumber = x => typeof x === 'number';

export const isObject = obj => obj instanceof Object;

export const isEmptyString = text => {
  if (!text || typeof text !== 'string') {
    return true;
  }
  return text === '';
};

export const isValidDate = x =>
  new Date(x) instanceof Date && !isNaN(new Date(x));

export const hasOwnProperty = obj => key => obj.hasOwnProperty(key);

export const isError = x => x instanceof Error;

const formatToLocaleDateString = (options = {}) => (
  formatStr = 'E, d. MMM yyyy h:mm aa'
) => dateAsText => {
  const date = new Date(dateAsText);
  return format(date, formatStr, options);
};

const date_EN = formatToLocaleDateString();
const date_SL = formatToLocaleDateString({ locale: sl });

const formatDate = Object.freeze({ date_EN, date_SL });
export default Object.freeze({
  isEmpty,
  isNull,
  isUndefined,
  isNumber,
  isObject,
  isEmptyString,
  hasOwnProperty,
  isError,
  formatDate,
});
