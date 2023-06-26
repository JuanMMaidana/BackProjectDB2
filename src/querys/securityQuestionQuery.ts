import { pool } from '../database';



export const getSecurityQuestionQuery = async () =>{
    
    const client = await pool.connect();

    try{

        const result = await client.query('SELECT * FROM PreguntasDeSeguridad');

        return result;

    }
    catch(error){
        throw error;
    }
    finally{
        client.release();
    }
}
