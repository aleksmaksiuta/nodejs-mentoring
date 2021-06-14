class BaseError extends Error {
  name;
  httpCode;
  isOperational;
  requestInfo;

  constructor(name, httpCode, description, isOperational = true) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  setRequestInfo(method, url, body) {
    this.requestInfo = {
      body,
      url,
      method,
    };
  }
}

module.exports = BaseError;
