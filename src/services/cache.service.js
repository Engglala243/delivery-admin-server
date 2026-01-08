const redis = require('redis');
const logger = require('../utils/logger');

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

client.connect();

const get = async (key) => {
  try {
    return await client.get(key);
  } catch (error) {
    logger.error('Cache get error:', error);
    return null;
  }
};

const set = async (key, value, expireInSeconds = 3600) => {
  try {
    await client.setEx(key, expireInSeconds, JSON.stringify(value));
  } catch (error) {
    logger.error('Cache set error:', error);
  }
};

const del = async (key) => {
  try {
    await client.del(key);
  } catch (error) {
    logger.error('Cache delete error:', error);
  }
};

module.exports = { get, set, del };