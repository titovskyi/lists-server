import { Router, Request, Response } from 'express';
import product from './product';
import list from './list';
import user from './user';
import { checkJwt } from '../middlewares/checkJwt';

const routes: Router = Router();

routes.get('/', async (req: Request, res: Response) => {console.log('hello / route')});
routes.use('/user', user);
routes.use('/list', [checkJwt], list);
routes.use('/product', [checkJwt], product);

export default routes;


//   "host": "localhost",
//   "port": 5432,
//   "username": "postgres",
//   "password": "0123456789",
//   "database": "purchaseLists",