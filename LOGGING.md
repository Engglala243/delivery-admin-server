# Logging System Documentation

## Overview
This backend implements a production-ready logging system with automatic file rotation, separate success and error logs, and comprehensive request tracking.

## Features
- ✅ Separate log files for success and error events
- ✅ Automatic file rotation (10MB max per file)
- ✅ Maximum 10 files retained per log type
- ✅ Automatic cleanup of old log files
- ✅ Request/response logging with performance metrics
- ✅ Structured JSON logging format
- ✅ Console and file output
- ✅ Graceful shutdown logging

## Directory Structure
```
logs/
├── success/
│   ├── success.log
│   ├── success.1.log
│   └── ... (up to 10 files)
└── error/
    ├── error.log
    ├── error.1.log
    └── ... (up to 10 files)
```

## Usage

### Success Logging
```javascript
const logger = require('../utils/logger');

// Log successful operations
logger.logSuccess('User registered successfully', {
  userId: user._id,
  email: user.email,
  action: 'REGISTER_USER'
});
```

### Error Logging
```javascript
const logger = require('../utils/logger');

// Log errors with context
logger.logError('Login failed - invalid password', error, {
  userId: user._id,
  email,
  action: 'LOGIN_USER'
});
```

### Standard Winston Methods
```javascript
logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');
```

## Automatic Features

### Request Logging
All API requests are automatically logged with:
- HTTP method and URL
- Response status code
- Request duration
- Client IP and User-Agent
- Response size

### Error Handling
All errors are automatically logged with:
- Error details and stack trace
- Request context (method, URL, IP)
- Timestamp and metadata

### Server Events
- Application startup/shutdown
- Database connections
- Unhandled exceptions/rejections

## Log Format
```json
{
  "timestamp": "2024-01-09 10:30:45",
  "level": "info",
  "message": "User registered successfully",
  "type": "SUCCESS",
  "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "email": "user@example.com",
  "action": "REGISTER_USER"
}
```

## Configuration
The logging system is configured in `src/utils/logger.js`:
- Log level: `info` in production, `debug` in development
- File size limit: 10MB per file
- File retention: 10 files maximum
- Automatic directory creation

## Production Considerations
- Log files are excluded from version control (`.gitignore`)
- Automatic cleanup prevents disk space issues
- Structured format enables log analysis tools
- Performance optimized with async file operations
- Graceful shutdown ensures log integrity