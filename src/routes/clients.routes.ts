import { Router } from 'express';
const router = Router();

import * as clientController from "../controllers/clientsController";
import { authjwt } from '../middlewares';

router.post('/', [authjwt.verifyToken, authjwt.isModerator], clientController.createClient);

router.get('/', authjwt.verifyToken, clientController.getClients);

router.get('/:id', clientController.getClientById);

router.put('/:id', [authjwt.verifyToken, authjwt.isAdmin], clientController.updateClientById);

router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin], clientController.deleteClientById);

export default router;