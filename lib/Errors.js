
class CannotCoerceError extends Error {
  constructor(expectedType, providedValue) {
    super(`wrong type, cannot coerce`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor() {
    super(`This model cannot be coerced`);
  }
}

module.exports = {
  CannotCoerceError,
  ModelError
};