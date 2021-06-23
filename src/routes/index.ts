import { Router } from 'express';
import session from './session';
import users from './users';

const router = Router();

router.use('/session', session);
router.use('/users', users);

export default router;
