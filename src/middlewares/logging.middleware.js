const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Override res.json to capture response data
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    
    // Log successful requests (2xx status codes)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      logger.logSuccess('API Request completed successfully', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        responseSize: JSON.stringify(data).length
      });
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = requestLogger;