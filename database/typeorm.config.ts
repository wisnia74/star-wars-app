import { DataSource } from 'typeorm';

// This is a config file to be exclusively used for migrations
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'app',
  entities: ['**/*.entity.ts'],
  migrations: ['database/migrations/*-migration.ts'],
  logging: true,
});

export default AppDataSource;
