import { Router } from 'express';

import { DeleteProductController } from '../controllers/product/DeleteProductController';
import { UpdateProductController } from '../controllers/product/UpdateProductController';

const router: Router = Router();

router.put('/:id([0-9]+)', UpdateProductController.put);
router.delete('/:id([0-9]+)', DeleteProductController.delete);

export default router;
