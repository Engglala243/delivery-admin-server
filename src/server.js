require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  logger.logSuccess(`Server started successfully on port ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.logSuccess(`Received ${signal}. Starting graceful shutdown...`, {
    signal,
    timestamp: new Date().toISOString()
  });
  
  server.close(() => {
    logger.logSuccess('Server closed successfully', {
      timestamp: new Date().toISOString()
    });
    process.exit(0);
  });
};

process.on('unhandledRejection', (err) => {
  logger.logError('Unhandled Promise Rejection', err, {
    type: 'UNHANDLED_REJECTION',
    timestamp: new Date().toISOString()
  });
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.logError('Uncaught Exception', err, {
    type: 'UNCAUGHT_EXCEPTION',
    timestamp: new Date().toISOString()
  });
  process.exit(1);
});

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));