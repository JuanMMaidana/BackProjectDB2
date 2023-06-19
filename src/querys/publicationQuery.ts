import {QueryResult} from 'pg';
import {pool} from '../database';


export const getPublicationsNecesityQuery = async (): Promise<QueryResult> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT u.ci, p.* FROM Usuarios u JOIN Publicaciones p ON u.ci = p.id_usuario'
        );
        return result;
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}