import { typeORMDriver } from 'react-native-quick-sqlite';
import { DataSource } from 'typeorm';
import { SessionStorage } from './models/SessionStorage';
import { NAME_BD } from '../config/constants';

export const dataSource = new DataSource({
  database: NAME_BD,
  entities: [SessionStorage],
  location: '.',
  logging: ['query', 'error', 'info', 'warn', 'log', 'schema'],
  synchronize: true,
  logger: 'advanced-console',
  type: 'react-native',
  driver: typeORMDriver,
});
