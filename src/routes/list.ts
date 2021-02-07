import { Router } from 'express';

import { GetListController } from '../controllers/list/GetListController';
import { PostListController } from '../controllers/list/PostListController';

import { ShareListController } from '../controllers/list/ShareListController';
import { GetUserListsController } from '../controllers/list/GetUserListsController';
import { PostProductToListController } from '../controllers/list/PostProductToListController';
import { DeleteUserListController } from '../controllers/list/DeleteUserListController';

const router: Router = Router();

router.post('/', PostListController.post);

router.get('/:id([0-9]+)', GetListController.get);
router.post('/:id([0-9]+)', PostProductToListController.post);

router.get('/user-lists', GetUserListsController.get);
router.delete('/user-lists/:id([0-9]+)', DeleteUserListController.delete);

router.put('/share', ShareListController.put);

export default router;
