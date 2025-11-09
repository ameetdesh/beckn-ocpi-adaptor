import { Router } from 'express';
import { notImplemented } from './utils';

const router = Router();

router.post('/', notImplemented('select'));

export default router;
