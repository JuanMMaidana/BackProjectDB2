import {Pool} from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: '192.168.56.102',
    password: '123456',
    database: 'postgres',
    port: 5432
});