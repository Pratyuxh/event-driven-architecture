import express from 'express';
import { getHealth } from '../../controllers/healthController';
const router = express.Router({ mergeParams: true });

router.get('/', getHealth);

export default router;
