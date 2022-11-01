// Mapper for environment variables
export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;

export const corsUrl = process.env.CORS_URL || '*';

export const mongodb = {
  name: process.env.MONGODB_NAME || '',
  host: process.env.MONGODB_HOST || '',
  port: process.env.MONGODB_PORT || '',
  username: process.env.MONGODB_USER_NAME || '',
  password: process.env.MONGODB_USER_PASSWORD || '',
};

export const redis = {
  name: process.env.REDIS_NAME || '',
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT || '',
  username: process.env.REDIS_USER_NAME || '',
  password: process.env.REDIS_USER_PASSWORD || '',
};
