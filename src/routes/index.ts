import { Router } from "express";
import { getPublicationsNecesity, getPublicationFiltersController, postPublication } from "../controllers/publication.controllers";
import { postUser, postUserLogin } from "../controllers/user.controller";
import authMiddleware from "../controllers/middleware/authControl";


const router = Router();

router.get('/publicationsNecesity', getPublicationsNecesity);

router.get('/publicationsFilters', getPublicationFiltersController);

router.post('/publication', authMiddleware, postPublication);

router.post('/registro', postUser);

router.post('/login' ,postUserLogin);














export default router;
