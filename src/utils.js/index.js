import URL_PATH from './urlAndPath';
export const { URL, PATH } = URL_PATH;

const newDate = date => new Date(date);

export const DATE_FUNCS = Object.freeze({ newDate });
export default Object.freeze({ DATE_FUNCS, URL, PATH });
