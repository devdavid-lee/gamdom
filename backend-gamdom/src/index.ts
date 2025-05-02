import express, { Express } from 'express';
import cors from 'cors';
import { AppDataSource } from './dataSource';
import { sportEventRouter } from './routes';
import { notFound } from './utils/errors';

const app: Express = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

app.use('/api/events', sportEventRouter);

app.use(notFound);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
