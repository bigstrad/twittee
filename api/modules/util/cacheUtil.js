const redis = require('redis');
const redisUrl = process.env.TWIT_TEE_REDIS_CONFIG || 'redis://localhost:6379';

// Connect redis
const cache = redis.createClient(redisUrl);

cache.on('connect', function () {
  console.log('Redis connected. Ready.');
});

cache.on('error', (err) => {
  console.log("Redis error " + err);
});

module.exports = cache;