import { createClient } from 'redis';
import { redis } from '../../config';
import Logger from '../../core/Logger';

const client = createClient({
  url: redis.url,
  username: redis.username,
  password: redis.password,
});

client.on('error', (err) => {
  Logger.info('Redis client error');
  Logger.error(err);
});
