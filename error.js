class AppException extends Error {

    constructor(code, message = {}) {
      const fullMsg = message ? `${code}: ${message}` : code;
      super(fullMsg);
      this.name = code;
      this.code = code;
      this.message = fullMsg;
    }
    
    toString() {
      return this.message;
    }
  }

  module.exports = AppException