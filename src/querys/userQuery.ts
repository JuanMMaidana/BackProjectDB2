import {QueryResult} from 'pg';
import {pool} from '../database';
import bycript from 'bcrypt';


export const postUserQuery = async (ci:number, names:string, surnmes:string, email:string, ubication:string, password:string, id_question: number, response:string): Promise<QueryResult> => {

    const client = await pool.connect();

    const hashedpassword = await bycript.hash(password, 10);

    try {
        
        const duplicatePK = await client.query('SELECT COUNT(*) AS count FROM usuarios WHERE ci = $1', [ci]);

        if(duplicatePK.rows[0].count > 0){
            throw ('La CI ya existe');
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




export const postUserLoginQuery = async (ci:number, password:string): Promise<any> => {
    
        const client = await pool.connect();
                
            const duplicatePK = await client.query('SELECT COUNT(*) AS count FROM usuarios WHERE ci = $1', [ci]);

            console.log(duplicatePK.rows[0].count)
            console.log(duplicatePK.rows)

    
            if(duplicatePK.rows[0].count == 0){
                console.log('La CI no existe')
                throw ('La CI no existe');
            }
    
            const result = await client.query('SELECT * FROM usuarios WHERE ci = $1', [ci]);

            console.log(result.rows)

    
            const passwordDB = result.rows[0].hpassword;
    
            const isMatch = await bycript.compare(password, passwordDB);
    
            if(!isMatch){
                throw ('Contraseña incorrecta');
            }
    
            return result;
    
        


    }