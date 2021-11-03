import { Router } from 'express';
const router = Router();
import * as authControllers from '../controllers/authController';
import { verifySignup, authjwt } from '../middlewares';

router.post('/signup', [ verifySignup.checkDuplicateUser, verifySignup.checkRolesExisted ], authControllers.singup);

router.post('/login', authControllers.login);

export default router;