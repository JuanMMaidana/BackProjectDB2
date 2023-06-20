import { Router } from "express";
import { getPublicationsNecesity, getPublicationsOffer, postPublication } from "../controllers/publication.controllers";


const router = Router();

router.get('/publicationsNecesity', getPublicationsNecesity);

router.get('/publicationsOffer', getPublicationsOffer);

router.post('/publication', postPublication);














export default router;
