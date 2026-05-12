import { Router } from 'express';
import * as collectorController from '../controllers/collector';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

router.use(authenticate);
router.use(authorize(['COLLECTOR']));

router.get('/profile', collectorController.getProfile);
router.patch('/profile', collectorController.updateProfile);
router.put('/catalog', collectorController.updateCatalog);

export default router;
