import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from './entity/Users';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  database: 'tokioPOS',
  synchronize: true,
  logging: false,
  entities: [Users],
  migrations: [],
  subscribers: [],
});
