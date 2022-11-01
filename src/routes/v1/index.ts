import express from 'express';
import health from './health';
const router = express.Router({ mergeParams: true });

router.use('/health', health);

export default router;
