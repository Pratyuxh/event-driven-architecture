import express from 'express';
import health from './health';
import order from './order';
import event from './event';
const router = express.Router({ mergeParams: true });

router.use('/health', health);
router.use('/order', order);
router.use('/event', event);

export default router;
