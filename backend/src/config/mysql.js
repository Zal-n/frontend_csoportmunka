import { createPool } from 'mysql2/promise';
import { config } from './env.js';

export const pool = createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
})
