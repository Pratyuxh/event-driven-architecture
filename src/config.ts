// Mapper for environment variables
export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;

export const corsUrl = process.env.CORS_URL || '*';

export const mongodb = {
  name: process.env.MONGODB_NAME || '',
  host: process.env.MONGODB_HOST || '',
  port: process.env.MONGODB_PORT || '',
  user: process.env.MONGODB_USER || '',
  password: process.env.MONGODB_USER_PWD || '',
};

export const redis = {
  url: process.env.REDIS_URL || '',
  username: process.env.REDIS_USERNAME || '',
  password: process.env.REDIS_PASSWORD || '',
};
