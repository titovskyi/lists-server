import { Router } from "express";

import {GetListsController} from "../controllers/list/GetListsController";
import {PostListController} from "../controllers/list/PostListController";

const router: Router = Router();

router.get("/", GetListsController.get);
router.post("/", PostListController.post);

export default router;