import { Router } from 'express';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { checkJwt } from '../middlewares/checkJwt';
import { CheckUserByTokenController } from '../controllers/user/CheckUserByTokenController';

const router: Router = Router();

router.get('/', [checkJwt], CheckUserByTokenController.get);
router.post('/login', LoginUserController.post);

export default router;
