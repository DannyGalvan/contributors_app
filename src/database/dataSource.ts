import { typeORMDriver } from 'react-native-quick-sqlite';
import { DataSource } from 'typeorm';
import { Configuration } from './models/SessionStorage';
import { NAME_BD } from '../config/constants';

export const dataSource = new DataSource({
  database: NAME_BD,
  entities: [Configuration],
  location: '.',
  logging: [],
  synchronize: false,
  logger: 'debug',
  type: 'react-native',
  driver: typeORMDriver,
});
