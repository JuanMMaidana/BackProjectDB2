import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();


export const pool = new Pool({

    user : process.env.user, 
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port:  5432
});