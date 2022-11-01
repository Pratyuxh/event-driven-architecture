import express from 'express';
import { addDelivery } from '../../controllers/deliveryController';
const router = express.Router({ mergeParams: true });

router.post('/', addDelivery);

export default router;
