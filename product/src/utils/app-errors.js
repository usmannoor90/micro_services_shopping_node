const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  ALREADY_EXISTS: 401,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational = true,
    errorStack = "",
    loggingErrorResponse = null
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// API Specific Errors
class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

// 400
class BadRequestError extends AppError {
  constructor(description = "Bad request", loggingErrorResponse = null) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      "",
      loggingErrorResponse
    );
  }
}

// 400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack = "") {
    super(
      "VALIDATION ERROR",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
