import { Request, Response } from "express";
import { getPublicationsNecesityQuery, getPublicationsOfferQuery, postPublicationQuery } from "../querys/publicationQuery";

export const getPublicationsNecesity = async (_req: Request, res: Response) => {
    try {
        const publications = await getPublicationsNecesityQuery();
        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


export const getPublicationsOffer = async (_req: Request, res: Response) => {
    try {
        const publications = await getPublicationsOfferQuery();
        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
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


