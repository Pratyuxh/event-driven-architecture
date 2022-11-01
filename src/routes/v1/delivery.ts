import express from 'express';
import { addDelivery, fetchDeliveryStatus } from '../../controllers/deliveryController';
const router = express.Router({ mergeParams: true });

router.post('/', addDelivery);
router.get('/:deliveryId', fetchDeliveryStatus);

export default router;
