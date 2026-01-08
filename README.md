# Delivery Admin Backend

A Node.js/Express backend API for delivery admin management system.

## Features

- Admin authentication with JWT
- Category and product management
- Order tracking and management
- Driver management
- File upload to Google Drive
- Email notifications
- Redis caching
- Rate limiting
- API documentation with Swagger

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

4. Start development server:
```bash
npm run dev
```

## API Documentation

Visit `/api-docs` for Swagger documentation.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests