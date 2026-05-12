import { Router } from 'express';
import * as discoveryController from '../controllers/discovery';

const router = Router();

router.get('/search', discoveryController.searchCollectors);
router.get('/categories', discoveryController.getCategories);

export default router;
