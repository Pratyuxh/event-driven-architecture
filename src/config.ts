// Mapper for environment variables
export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;

export const corsUrl = process.env.CORS_URL || '*';
