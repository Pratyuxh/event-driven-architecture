import express from 'express';
import health from './health';
import delivery from './delivery';
const router = express.Router({ mergeParams: true });

router.use('/health', health);
router.use('/delivery', delivery);

export default router;
