import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';
import { AppDataSource } from './dataSource';
import { sportEventRouter } from './routes';
import { errorHandlerMiddleware as errorHandler } from './middleware';
import { notFound } from './utils/errors';
import logger from './utils/logger';

AppDataSource.initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');

    const app: Express = express();
    const port = parseInt(process.env.PORT || '5000', 10);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api/events', sportEventRouter);

    app.use(notFound);
    app.use(errorHandler);
    app.listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    logger.error('Error during Data Source initialization:', err);
    process.exit(1);
  });
