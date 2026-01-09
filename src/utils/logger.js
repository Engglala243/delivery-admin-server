const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory structure
const logsDir = path.join(process.cwd(), 'logs');
const successLogsDir = path.join(logsDir, 'success');
const errorLogsDir = path.join(logsDir, 'error');

[logsDir, successLogsDir, errorLogsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Custom format for filtering log levels
const successFilter = winston.format((info) => {
  return info.level === 'info' ? info : false;
});

const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Success logs (info level only)
    new winston.transports.File({
      filename: path.join(successLogsDir, 'success.log'),
      level: 'info',
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      format: winston.format.combine(
        successFilter(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
      handleExceptions: false,
      handleRejections: false
    }),
    // Error logs (error level only)
    new winston.transports.File({
      filename: path.join(errorLogsDir, 'error.log'),
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      format: winston.format.combine(
        errorFilter(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false
});

// Custom methods for success and error logging
logger.logSuccess = (message, meta = {}) => {
  logger.info(message, { type: 'SUCCESS', ...meta });
};

logger.logError = (message, error = null, meta = {}) => {
  const errorData = {
    type: 'ERROR',
    message,
    ...meta
  };
  
  if (error) {
    errorData.error = {
      message: error.message,
      stack: error.stack,
      name: error.name
    };
  }
  
  logger.error(errorData);
};

module.exports = logger;