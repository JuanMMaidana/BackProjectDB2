import { Router } from "express";
import { getPublicationsNecesity, postPublicationFiltersController, postPublication, getCategories, getPublicationsUser } from "../controllers/publication.controllers";
import { postUser, postUserLogin, postFollowFriend, postFriendshipState, getUserInfo } from "../controllers/user.controller";
import authMiddleware from "../controllers/middleware/authControl";
import { getSecurityQuestion } from "../controllers/securityQuestion.controller";


const router = Router();

router.get('/publicationsNecesity', getPublicationsNecesity);

router.post('/publicationsFilters', postPublicationFiltersController);

router.post('/publication', authMiddleware, postPublication);

router.post('/registro', postUser);

router.post('/login' ,postUserLogin);

router.get('/categorias', getCategories);

router.get('/publicationsUser', authMiddleware, getPublicationsUser);

router.post('/seguirAmigo', authMiddleware, postFollowFriend);

router.get('/publiacionesAmigos', authMiddleware, getPublicationsUser);

router.get('/getUser', authMiddleware, getUserInfo);

router.get('/securityQuestion', getSecurityQuestion);

router.post('/friendsState', authMiddleware, postFriendshipState);















export default router;
