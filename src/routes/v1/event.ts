import express from 'express';
import { dispatchEvent } from '../../controllers/eventController';
const router = express.Router({ mergeParams: true });

router.post('/dispatch', dispatchEvent);

export default router;
