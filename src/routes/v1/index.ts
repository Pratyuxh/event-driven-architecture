import express from 'express';
import health from './health';
import delivery from './delivery';
import event from './event';
const router = express.Router({ mergeParams: true });

router.use('/health', health);
router.use('/delivery', delivery);
router.use('/event', event);

export default router;
