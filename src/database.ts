import {Pool} from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: '192.168.64.7',
    password: 'password',
    database: 'projectDB22',
    port: 5432
});