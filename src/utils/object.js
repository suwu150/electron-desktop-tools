
import lang from 'lodash/lang';

function arrayLength(value) {
  if (!value) return 0;
  if (lang.isArray(value)) return value.length;
  if (lang.isObject(value)) return 1;
  return 0;
}

function arrayProcessor(value) {
  if (!value) return [];
  if (lang.isArray(value)) return value;
  return [value];
}

function arr2obj(value, key) {
  if (lang.isArray(value)) {
    return value.reduce((result, item) => {
      result[item[key]] = item;
      return result;
    }, {});
  }
  return value;
}

function smartDeepClone(value, customizer) {
  if (lang.isArray(value)) {
    return value.map(item => smartDeepClone(item, customizer));
  }

  if (lang.isObject(value)) {
    const retValue = {};
    Object.keys(value).forEach(key => {
      retValue[customizer(key)] = smartDeepClone(value[key], customizer);
    });
    return retValue;
  }

  return value;
}

function objectProcessor(value) {
  if (lang.isObject(value)) return value;
  if (lang.isArray(value) && value.length > 0) return value[0];
  return {};
}

export { arrayLength, arrayProcessor, arr2obj, smartDeepClone, objectProcessor };
