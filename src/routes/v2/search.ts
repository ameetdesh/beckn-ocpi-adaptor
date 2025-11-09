import { Router } from 'express';
import { notImplemented } from './utils';

const router = Router();

router.post('/', notImplemented('search'));

export default router;
