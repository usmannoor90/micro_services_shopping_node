const { createLogger, transports, format } = require("winston");
const { AppError } = require("./app-errors");

const LogErrors = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}

  async logError(err) {
    console.log("==================== Start Error Logger ===============");
    LogErrors.log({
      level: "error",
      message: `${new Date().toISOString()} - ${JSON.stringify(err)}`,
    });
    console.log("==================== End Error Logger ===============");

    return false;
  }

  isTrustError(error) {
    return error instanceof AppError && error.isOperational;
  }
}

module.exports = ErrorLogger;
