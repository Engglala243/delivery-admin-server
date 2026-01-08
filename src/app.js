const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const rateLimiter = require('./middlewares/rateLimiter.middleware');
const swaggerSetup = require('./config/swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

swaggerSetup(app);

app.use('/api', routes);

app.use(errorMiddleware);

module.exports = app;