import { Router } from 'express';
import session from './session';
import users from './users';
import peliculas from './peliculas';

const router = Router();

router.use('/session', session);
router.use('/users', users);
router.use('/peliculas',peliculas)
export default router;
