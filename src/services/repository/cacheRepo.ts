import redisClient from '../../database/redis';

const setCache = (key: string, value: string) => {
  return redisClient.set(key, value);
};

const setOrderCache = (orderId: string, value: string) => {
  return redisClient.set(`Order:${orderId}`, value);
};

const getCache = (key: string) => {
  return redisClient.get(key);
};

const getOrderCache = (orderId: string) => {
  return redisClient.get(`Order:${orderId}`);
};

export { setCache, setOrderCache, getCache, getOrderCache };
