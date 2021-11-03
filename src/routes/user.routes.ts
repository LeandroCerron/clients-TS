import { Router } from 'express';
const router = Router();
import * as userController from '../controllers/userController';
import {authjwt} from '../middlewares';

router.post('/', userController.createUser);

router.get('/', [
    authjwt.verifyToken,
    authjwt.isAdmin
], userController.getUsers);

export default router;