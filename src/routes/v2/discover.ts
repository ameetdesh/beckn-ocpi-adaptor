import { Router } from 'express';
import { discoverHandler } from '../discover';

const router = Router();

router.post('/', discoverHandler);

export default router;
