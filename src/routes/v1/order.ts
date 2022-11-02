import express from 'express';
import { addOrder, fetchOrderStatus } from '../../controllers/orderController';
const router = express.Router({ mergeParams: true });

router.post('/', addOrder);
router.get('/:orderId', fetchOrderStatus);

export default router;
