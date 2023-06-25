import { Request, Response } from "express";
import { getPublicationsNecesityQuery, postPublicationQuery, postPublicationFiltersQuery, getCategoriesQuery, getPublicationsUserQuery } from "../querys/publicationQuery";

export const getPublicationsNecesity = async (_req: Request, res: Response) => {
    try {
        const publications = await getPublicationsNecesityQuery();
        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const postPublicationFiltersController = async (req: Request, res: Response) => {
    try {
        const { titulo, categoria, es_solicitud } = req.body;

        const publications = await postPublicationFiltersQuery(titulo, categoria, es_solicitud);

        res.status(200).json(publications.rows);
    }
    catch(error:any){
        res.status(500).json(error.message);
    }
}

//ci: string, titulo: string, descripcion: string, id_categoria: number, es_solicitud: boolean, url: string, id_usuario: string

export const postPublication = async (req, res) => {
    try{
        const {titulo, descripcion, id_categoria, es_solicitud, url} = req.body;

        const ci2 = req.user.ci; // Obtiene la ci del usuario desde el objeto req
        const publications = await postPublicationQuery(ci2, titulo, descripcion, id_categoria, es_solicitud, url);

        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await getCategoriesQuery();
        res.status(200).json(categories.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}   



export const getPublicationsUser = async (req, res) => {
    try {
        const ci = req.user.ci;
        const publications = await getPublicationsUserQuery(ci);
        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}



