import { DataSource } from 'typeorm';
import { SportEvent } from './entities/SportEvent';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'betting',
  synchronize: true,
  logging: true,
  entities: [SportEvent],
  subscribers: [],
  migrations: [],
});
