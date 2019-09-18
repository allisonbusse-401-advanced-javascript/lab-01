
/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
const isString = input => {
  return typeof input === 'string';
};

/**
 * Is this a number
 * @param input
 * @returns {boolean}
 */
const isNumber = input => {
  return typeof input === 'number';
};

/**
 * Is this an array?
 * @param input
 * @returns {boolean}
 */
const isArray = input => {
  return input instanceof Array;
};

/**
 * Is this an object?
 * @param input
 * @returns {boolean}
 */
const isObject = input => {
  if(isArray(input)) {
    return false;
  } 
  else if(String(input) === String({})) {
    return typeof input === 'object';
  }
};

/**
 * Is this a function?
 * @param input
 * @returns {boolean}
 */
const isFunction = input => {
  return typeof input === 'function';
};

/**
 * Is this a boolean?
 * @param input
 * @returns {boolean}
 */
const isBoolean = input => {
  return typeof input === 'boolean';
};

/**
 * Is this an array of strings?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfStrings = (input) => {
  return input.every(isString);
};

/**
 * Is it an array of numbers?
 * @param input
 * @returns {boolean}
 */
const isArrayOfNumbers = (input) => {
  return input.every(isNumber);
};

/**
 * Is it an array of objects?
 * @param input
 * @returns {boolean}
 */
const isArrayOfObjects = (input) => {
  return input.every(isObject);
};

/**
 * Is it an array of booleans?
 * @param input
 * @returns {boolean}
 */
const isArrayOfBooleans = (input) => {
  return input.every(isBoolean);
};

/**
 * Based on a set of rules, what is correct validator?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param rules
 * @returns {boolean}
 */
const getValidator = (input) => {
  const validatorList = {
    string: isString,
    number: isNumber,
    array: isArray,
    object: isObject,
    function: isFunction,
    boolean: isBoolean,
    numbers: isArrayOfNumbers,
    strings: isArrayOfStrings,
    objects: isArrayOfObjects,
    booleans: isArrayOfBooleans
  };
  return validatorList[input];
};

/** 
 * Can it be coerced into a string?
 */
class CannotCoerceError extends Error {
  constructor() {
    super('wrong type, cannot coerce');
  }
}

const castString = (input) => {
  if(isArray(input) || isObject(input)) {
    throw new CannotCoerceError(input);
  } else {
    return String(input);
  }
};

const castNumber = (input) => {
  if(isNumber(input)) {
    return Number(input);
  } else if(isString(input)) {
    if(input.match(/[0-9]/)) {
      return Number(input);
    }}
  else {
    throw new CannotCoerceError(input);
  }
};

module.exports = {
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction,
  isBoolean,

  isArrayOfStrings,
  isArrayOfNumbers,
  isArrayOfObjects,
  isArrayOfBooleans,

  getValidator,
  CannotCoerceError,
  castString,
  castNumber
};