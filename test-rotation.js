const logger = require('./src/utils/logger');

// Function to generate large log entries to test rotation
function generateLargeLogs() {
  console.log('Generating logs to test rotation...');
  
  // Generate approximately 11MB of logs to trigger rotation
  const largeData = 'x'.repeat(1000); // 1KB string
  
  for (let i = 0; i < 6000; i++) { // ~6MB of success logs
    logger.logSuccess(`Success log entry ${i}`, {
      data: largeData,
      iteration: i,
      action: 'ROTATION_TEST'
    });
  }
  
  for (let i = 0; i < 6000; i++) { // ~6MB of error logs
    logger.logError(`Error log entry ${i}`, new Error(`Test error ${i}`), {
      data: largeData,
      iteration: i,
      action: 'ROTATION_TEST'
    });
  }
  
  console.log('Log generation complete. Check logs/ directory for rotation.');
}

// Run the test
generateLargeLogs();

// Exit after a short delay to ensure all logs are written
setTimeout(() => {
  console.log('Test completed. Exiting...');
  process.exit(0);
}, 2000);