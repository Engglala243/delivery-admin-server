const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const loggingMiddleware = require("./middlewares/logging.middleware");
const rateLimiter = require("./middlewares/rateLimiter.middleware");
const swaggerSetup = require("./config/swagger");
const logger = require("./utils/logger");

const app = express();

// Configure CORS to allow frontend access
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Configure helmet to allow images
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Add logging middleware
app.use(loggingMiddleware);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

swaggerSetup(app);

app.use("/api", routes);

app.use(errorMiddleware);

// Log application startup
logger.logSuccess('Application initialized successfully', {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000
});

module.exports = app;
