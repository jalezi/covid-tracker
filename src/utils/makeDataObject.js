import {
  isValidDate,
  isEmpty,
  isEmptyString,
  hasOwnProperty,
  isError,
  isObject,
} from './utilities';

function convertToDate(date) {
  if (isValidDate(date)) return new Date(date);
  return new Error('argument is not valid date');
}

function freezeObj(obj = {}) {
  return Object.freeze({ ...obj });
}

function makeSingleDataFreezeObj(obj = {}) {
  if (isEmpty(obj)) return new Error(`argument: ${obj} is an empty object`);

  return key => {
    if (isEmptyString(key))
      return new Error(`argument: ${key} is not a valid key`);
    if (!hasOwnProperty(obj)(key))
      return new Error(`argument <obj> does not have property: ${key}`);

    return Object.freeze({ key: obj[key] });
  };
}

function propertyValue(obj) {
  return key => {
    const newObj = makeSingleDataFreezeObj(obj, key);
    if (isError(newObj)) return newObj;

    return newObj[key];
  };
}

function dataKeys(obj) {
  return Object.keys(obj);
}

function dataValues(obj) {
  return Object.values(obj);
}

function makeDataObject(data = {}) {
  const dataIsNotObject = !isObject(data);

  if (dataIsNotObject) return new Error(`${data} is not an instance of Object`);
  if (isEmpty(data)) return new Error('argument is empty object');

  const newObject = {};
  const newData = { ...data };

  let updated = convertToDate(newData['updated']);
  const updatedIsDate = !isError(updated);
  if (updatedIsDate) newObject['updated'] = updated;

  const dataObject = freezeObj(newData, newObject);

  const getDataPropertyAsObject = makeSingleDataFreezeObj(dataObject);
  const getDataPropertyValue = propertyValue(dataObject);
  const getDataKeys = dataKeys(dataObject);
  const getDataValues = dataValues(dataObject);

  const returnObj = freezeObj({
    getDataPropertyAsObject,
    getDataPropertyValue,
    getDataKeys,
    getDataValues,
    dataObject,
  });

  return returnObj;
}

export default makeDataObject;
