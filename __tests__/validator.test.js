const validator = require('../lib/validator.js');

describe('validator module', () => {
  
  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => {};
  const bool = false;

  describe('performs basic validation of', () => {

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();

      
    });

    it('objects', () => {
      expect(validator.isObject(obj)).toBeTruthy();
      expect(validator.isObject(str)).toBeFalsy();
      expect(validator.isObject(num)).toBeFalsy();
      expect(validator.isObject(arr)).toBeFalsy();
      expect(validator.isObject(func)).toBeFalsy();
      expect(validator.isObject(bool)).toBeFalsy();

    });

    it('booleans', () => {
      expect(validator.isBoolean(bool)).toBeTruthy();
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();

    });

    it('functions', () => {
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(bool)).toBeFalsy();

      
    });
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    it('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();

    });

    it('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();

    });

    it('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();

    });
  });

  describe('get validator for', () => {

    it('strings', () => {
      expect(validator.getValidator('string')).toBe(validator.isString);
    });
    
    it('numbers', () => {
      expect(validator.getValidator('number')).toBe(validator.isNumber);
    });

    it('arrays', () => {
      expect(validator.getValidator('array')).toBe(validator.isArray);

    });

    it('objects', () => {
      expect(validator.getValidator('object')).toBe(validator.isObject);

    });

    it('booleans', () => {
      expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
    });

    it('functions', () => {
      expect(validator.getValidator('function')).toBe(validator.isFunction);
    });

    it('array of strings', () => {
      expect(validator.getValidator('strings')).toBe(validator.isArrayOfStrings);
    });

    it('array of numbers', () => {
      expect(validator.getValidator('numbers')).toBe(validator.isArrayOfNumbers);
    });

    it('array of objects', () => {
      expect(validator.getValidator('objects')).toBe(validator.isArrayOfObjects);
    });

    it('array of booleans', () => {
      expect(validator.getValidator('booleans')).toBe(validator.isArrayOfBooleans);

    });

  });
});

describe('cast into string', () => {
  const str = 'hello';
  const number = 42;
  const bool = true;
  const obj = {};
  const array = [];
  const date = new Date();
  const strNumber = '42';
  const numberOne = 1;
  const strTrue = 'true';
  const strFalse = 'false';


  it('strings', () => {
    expect(validator.castString(str)).toBe('hello');
    expect(validator.castString(number)).toBe('42');
    expect(validator.castString(bool)).toBe('true');
    expect(validator.castString(date)).toBe(String(new Date()));
    expect(() => {
      validator.castString(array);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castString(obj);
    }).toThrow(validator.CannotCoerceError);
  });

  it('numbers', () => {
    expect(validator.castNumber(number)).toBe(42);
    expect(validator.castNumber(strNumber)).toBe(42);
    expect(() => {
      validator.castNumber(str);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castNumber(bool);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castNumber(array);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castNumber(date);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castNumber(obj);
    }).toThrow(validator.CannotCoerceError);
  });

  it('booleans', () => {
    expect(validator.castBool(bool)).toBe(true);
    expect(validator.castBool(numberOne)).toBe(true);
    expect(validator.castBool(strTrue)).toBe(true);
    expect(validator.castBool(strFalse)).toBe(false);
    expect(() => {
      validator.castBool(obj);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castBool(array);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castBool(str);
    }).toThrow(validator.CannotCoerceError);
    expect(() => {
      validator.castBool(date);
    }).toThrow(validator.CannotCoerceError);
  });

});