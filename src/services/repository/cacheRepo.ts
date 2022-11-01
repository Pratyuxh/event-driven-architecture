import redisClient from '../../database/redis';

const setCache = (key: string, value: string) => {
  return redisClient.set(key, value);
};

const getCache = (key: string) => {
  return redisClient.get(key);
};

export { setCache, getCache };
