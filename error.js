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
  
  // status-code
  /*
  try {
    throw new AppException(message);
  } catch(e) {
    console.error(e);
    console.error(e.toString());
    console.log(e.code === 'OUT OF SERVICE');
  }
  
  // status-code and message
  try {
    throw new AppException('OUT OF SERVICE', '');
  } catch(e) {
    console.error(e);
    console.error(e.toString());
    console.log(e.code === 'OUT OF SERVICE');
  }
  */

  module.exports = AppException