import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { corsUrl, environment } from './config';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import routesV1 from './routes/v1';
import './database/redis';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(compression());
app.use(helmet());

app.use(
  morgan('short', {
    skip: (req: Request) => req.originalUrl === '/v1/health',
    stream: {
      write: (meta: string) => {
        Logger.info(meta);
      },
    },
  }),
);

// Routes
app.use('/v1', routesV1);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
