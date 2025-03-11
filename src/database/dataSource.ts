import { typeORMDriver } from 'react-native-quick-sqlite';
import { DataSource } from 'typeorm';
import { SessionStorage } from '@database/models/SessionStorage';
import { NAME_BD } from '@config/constants';
import { Overtime } from '@database/models/Overtime';
import { LocationStore } from '@database/models/LocationStore';

export const dataSource = new DataSource({
  database: NAME_BD,
  entities: [SessionStorage, Overtime, LocationStore],
  location: '.',
  logging: [],
  synchronize: true,
  logger: 'advanced-console',
  type: 'react-native',
  driver: typeORMDriver,
});

//logging: ['query', 'error', 'info', 'warn', 'log', 'schema']
