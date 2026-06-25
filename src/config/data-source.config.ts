import { DataSource } from 'typeorm';
import * as dotenvFlow from 'dotenv-flow';
import { join } from 'path';

dotenvFlow.config({
  node_env: process.env.NODE_ENV || 'development',
  default_node_env: 'development',
  path: process.cwd(),
  purge_dotenv: true,
});

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'todo',
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', 'common', 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging: true,
});
