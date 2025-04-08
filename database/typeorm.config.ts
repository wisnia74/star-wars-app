import 'dotenv/config';
import { DataSource } from 'typeorm';

// This is a config file to be exclusively used for migrations and seeding
const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['**/*.entity.ts'],
  migrations: ['database/migrations/*-migration.ts'],
  logging: !!process.env.DATABASE_LOGGING,
});

export default AppDataSource;
