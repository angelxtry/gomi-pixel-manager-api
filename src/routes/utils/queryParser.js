import qs from 'qs';

const queryParser = {
  parse,
  middleware,
  isObject,
  isNumber,
  isBoolean,
  isArray,
  parseValue,
  parseObject,
  parseArray,
  parseNumber,
  parseBoolean,
}
export default queryParser;

export function parse(queryString) {
  return parseObject(qs.parse(queryString))
}

export function isObject(val) {
  return val.constructor === Object;
}

export function isNumber(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

export function isNull(val) {
  return val === 'null';
}

export function isBoolean(val) {
  return val === 'false' || val === 'true';
}

export function isArray(val) {
  return Array.isArray(val);
}

export function parseValue(val) {
  if (typeof val === 'undefined' || val === '') {
    return null;
  } else if (isBoolean(val)) {
    return parseBoolean(val);
  } else if (isArray(val)) {
    return parseArray(val);
  } else if (isObject(val)) {
    return parseObject(val);
  } else if (isNumber(val)) {
    return parseNumber(val);
  } else if (isNull(val)) {
    return parseNull(val);
  } else {
    return val;
  }
}

export function parseObject(obj) {
  var result = {};
  var key, val;
  for (key in obj) {
    val = parseValue(obj[key]);
    result[key] = val; // ignore null values
  }
  return result;
}

export function parseArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = parseValue(arr[i]);
  }
  return result;
}

export function parseNumber(val) {
  return Number(val);
}

export function parseNull(val) {
  return null;
}

export function parseBoolean(val) {
  return val === 'true';
}

export function middleware() {
  return function(req, res, next) {
    req.query = parseObject(req.query);
    next();
  }
}
