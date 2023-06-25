import {QueryResult} from 'pg';
import {pool} from '../database';
import bycript from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';



dotenv.config();


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


    
            if(duplicatePK.rows[0].count == 0){
                throw new Error('La CI no existe');
            }
    
            const result = await client.query('SELECT * FROM usuarios WHERE ci = $1', [ci]);


            const passwordDB = result.rows[0].hpassword;
    
            const isMatch = await bycript.compare(password, passwordDB);

    
            if(!isMatch){
                throw new Error('Contraseña incorrecta');
            }


            const token = jwt.sign({ ci: result.rows[0].ci }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    
            return {
                token,
                user: {
                    ci: result.rows[0].ci,
                }
            };
    
        


    }




export const postFollowFriendQuery = async (ci:number, ci_friend:number): Promise<QueryResult> => {
    
        const client = await pool.connect();
    
        try {
            
            const duplicatePK = await client.query('SELECT COUNT(*) AS count FROM seguidores WHERE ci_user = $1 AND ci_seguidor = $2', [ci, ci_friend]);
    
            if(duplicatePK.rows[0].count > 0){
                throw new Error('Ya sigues a este usuario');
            }
    
            const insertUser = `
            INSERT INTO seguidores (ci_user, ci_seguidor) VALUES ($1, $2)`
    
            const values = [ci, ci_friend];
    
            const result = await client.query(insertUser, values);
    
            return result;
    
        }
        catch (error:any) {
            throw error;
        }
        finally {
            client.release();
        }
    }

export const getUserInfoQuery = async (ci:number): Promise<QueryResult> => {
        
            const client = await pool.connect();
        
            try {
                
                const result = await client.query('SELECT nombre,apellidos,email,direccion FROM usuarios WHERE ci = $1', [ci]);
        
                return result;
        
            }
            catch (error:any) {
                throw error;
            }
            finally {
                client.release();
            }
        }