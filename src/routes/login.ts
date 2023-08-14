import { Router } from 'express';
import loginController from '../controller/loginController';
import loginM from '../middleware/login';

const router = Router();

router.post('/', loginM.usernameV, loginM.passwordV, loginController.loginUser);

export default router;