import { Router } from "express";
import { getPublicationsNecesity } from "../controllers/publication.controllers";


const router = Router();

router.get('/publications', getPublicationsNecesity);














export default router;
