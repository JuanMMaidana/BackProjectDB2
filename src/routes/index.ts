import { Router } from "express";
import { getPublicationsNecesity, getPublicationsOffer, postPublication } from "../controllers/publication.controllers";
import { postUser, postUserLogin } from "../controllers/user.controller";


const router = Router();

router.get('/publicationsNecesity', getPublicationsNecesity);

router.get('/publicationsOffer', getPublicationsOffer);

router.post('/publication', postPublication);

router.post('/registro', postUser);

router.post('/login', postUserLogin);














export default router;
