import { Router } from 'express';
import * as orderController from '../controllers/order';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.post('/', orderController.createOrder);
router.get('/me', orderController.getMyOrders);
router.get('/:id', orderController.getOrderDetail);
router.patch('/:id/accept', orderController.acceptOrder);
router.patch('/:id/validate', orderController.validateOrder);
router.patch('/:id/confirm', orderController.confirmOrder);
router.patch('/:id/cancel', orderController.cancelOrder);

export default router;
