import { Client } from 'redis-om';
import { redis } from '../../config';
import Logger from '../../core/Logger';

const client = new Client();

// Build the connection string
const dbURI = `redis://${redis.username}:${encodeURIComponent(redis.password)}@${redis.host}:${
  redis.port
}`;

console.log(dbURI);

client
  .open(dbURI)
  .then(() => {
    Logger.info('Redis connection done');
  })
  .catch((err) => {
    Logger.info('Redis connection error');
    Logger.error(err);
  });
