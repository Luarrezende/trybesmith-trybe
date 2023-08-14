import { Router } from 'express';
import ordersController from '../controller/ordersController';

const router = Router();

router.get('/', ordersController.getAll);

export default router;