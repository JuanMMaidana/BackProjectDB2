import {QueryResult} from 'pg';
import {pool} from '../database';
import { PublicationWithUser } from '../models/models';




// SELECT p.titulo,p.descripcion,p.fecha,u.nombre,u.apellidos,u.email,u.direccion,c.nombre AS categoria,m.url AS multimedia 
//    FROM Publicaciones p 
//        JOIN Usuarios u 
//        ON p.id_usuario = u.ci 
//            JOIN Categorias c 
//            ON p.id_categoria = c.id_categoria 
//                JOIN Multimedia m 
//                ON p.id_multimedia = m.id_multimedia 
//    WHERE p.es_solicitud = true 
//    ORDER BY p.fecha DESC
export const getPublicationsNecesityQuery = async (): Promise<QueryResult> => {
    const client = await pool.connect();
    try {
        const results: QueryResult<any> = await client.query('SELECT p.titulo,p.descripcion,p.fecha,u.nombre,u.apellidos,u.email,u.direccion,c.nombre AS categoria,m.url AS multimedia FROM Publicaciones p JOIN Usuarios u ON p.id_usuario = u.ci JOIN Categorias c ON p.id_categoria = c.id_categoria JOIN Multimedia m ON p.id_multimedia = m.id_multimedia WHERE p.es_solicitud = true ORDER BY p.fecha DESC'
        );

        const publications: PublicationWithUser[] = results.rows.map(row => ({
            titulo: row.titulo,
            descripcion: row.descripcion,
            fecha: row.fecha,
            nombre: row.nombre,
            apellido: row.apellidos,
            email: row.email,
            direccion: row.direccion,
            categoria: row.categoria,
            multimedia: row.multimedia
        }));
            

        return { ...results, rows: publications };
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}




export const getPublicationsOfferQuery = async (): Promise<QueryResult> => {
    const client = await pool.connect();
    try {
        const results: QueryResult<any> = await client.query('SELECT p.titulo,p.descripcion,p.fecha,u.nombre,u.apellidos,u.email,u.direccion,c.nombre AS categoria,m.url AS multimedia FROM Publicaciones p JOIN Usuarios u ON p.id_usuario = u.ci JOIN Categorias c ON p.id_categoria = c.id_categoria JOIN Multimedia m ON p.id_multimedia = m.id_multimedia WHERE p.es_solicitud = false ORDER BY p.fecha DESC'
        );

        const publications: PublicationWithUser[] = results.rows.map(row => ({
            titulo: row.titulo,
            descripcion: row.descripcion,
            fecha: row.fecha,
            nombre: row.nombre,
            apellido: row.apellidos,
            email: row.email,
            direccion: row.direccion,
            categoria: row.categoria,
            multimedia: row.multimedia
        }));
            

        return { ...results, rows: publications };
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

//``````

export const postPublicationQuery = async (ci: number, titulo: string, descripcion: string, id_categoria: number, es_solicitud: boolean, url: string): Promise<QueryResult> => {
    console.log(ci, titulo, descripcion, id_categoria, es_solicitud, url);
    const client = await pool.connect();
  try {
    const query = `
      WITH inserted_multimedia AS (
        INSERT INTO multimedia (url) VALUES ($1) RETURNING id_multimedia
        )
      INSERT INTO Publicaciones (titulo, descripcion, fecha, es_solicitud,id_usuario, id_categoria, id_estado ,id_multimedia)
      SELECT $2, $3, CURRENT_DATE, $4, $5, $6, 1,id_multimedia
      FROM inserted_multimedia;
    `;
    const values = [url, titulo, descripcion, ci, id_categoria, es_solicitud];

    const results: QueryResult<any> = await client.query(query, values);

    return results;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}