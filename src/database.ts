import {Pool} from 'pg';


export const pool = new Pool({
    user: 'postgres',
    host: '192.168.64.7',
    password: 'password',
    database: 'projectBD2',
    port: 5432
});