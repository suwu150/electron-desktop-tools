
function ValidateError(path, message) {
  this.path = path;
  this.message = message || 'Validate Message';
  this.stack = (new Error()).stack;
}

ValidateError.prototype = Object.create(Error.prototype);
ValidateError.prototype.constructor = ValidateError;

export { ValidateError };
