import {QueryResult} from 'pg';
import {pool} from '../database';
import bycript from 'bcrypt';


export const postUserQuery = async (ci:number, names:string, surnmes:string, email:string, ubication:string, password:string, id_question: number, response:string): Promise<QueryResult> => {

    const client = await pool.connect();

    const hashedpassword = await bycript.hash(password, 10);

    try {
        
        const duplicatePK = await client.query('SELECT COUNT(*) AS count FROM usuarios WHERE ci = $1', [ci]);

        if(duplicatePK.rows[0].count > 0){
            throw new Error('La CI ya existe');
        }

        const insertUser = `
        INSERT INTO usuarios (ci, nombre, apellidos, email, direccion, Hpassword, pregunta, respuesta) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ci, nombre, apellidos, email, direccion`

        const values = [ci, names, surnmes, email, ubication, hashedpassword, id_question, response];

        const result = await client.query(insertUser, values);

        return result;

    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}