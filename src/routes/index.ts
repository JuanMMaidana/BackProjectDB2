import { Router } from "express";
import { getPublicationsNecesity, getPublicationFiltersController, postPublication, getCategories, getPublicationsUser } from "../controllers/publication.controllers";
import { postUser, postUserLogin, postFollowFriend, getUserInfo } from "../controllers/user.controller";
import authMiddleware from "../controllers/middleware/authControl";


const router = Router();

router.get('/publicationsNecesity', getPublicationsNecesity);

router.get('/publicationsFilters', getPublicationFiltersController);

router.post('/publication', authMiddleware, postPublication);

router.post('/registro', postUser);

router.post('/login' ,postUserLogin);

router.get('/categorias', getCategories);

router.post('/publicationsUser', authMiddleware, getPublicationsUser);

router.post('/seguirAmigo', authMiddleware, postFollowFriend);

router.get('/publiacionesAmigos', authMiddleware, getPublicationsUser);

router.get('/getUser', authMiddleware, getUserInfo)















export default router;
