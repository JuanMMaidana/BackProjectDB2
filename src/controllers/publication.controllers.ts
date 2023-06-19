import { Request, Response } from "express";
import { getPublicationsNecesityQuery } from "../querys/publicationQuery";

export const getPublicationsNecesity = async (_req: Request, res: Response) => {
    try {
        const publications = await getPublicationsNecesityQuery();
        res.status(200).json(publications.rows);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

