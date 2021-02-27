"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetListController_1 = require("../controllers/list/GetListController");
const PostListController_1 = require("../controllers/list/PostListController");
const ShareListController_1 = require("../controllers/list/ShareListController");
const GetUserListsController_1 = require("../controllers/list/GetUserListsController");
const PostProductToListController_1 = require("../controllers/list/PostProductToListController");
const DeleteUserListController_1 = require("../controllers/list/DeleteUserListController");
const router = express_1.Router();
router.post('/', PostListController_1.PostListController.post);
router.get('/:id([0-9]+)', GetListController_1.GetListController.get);
router.post('/:id([0-9]+)', PostProductToListController_1.PostProductToListController.post);
router.get('/user-lists', GetUserListsController_1.GetUserListsController.get);
router.delete('/user-lists/:id([0-9]+)', DeleteUserListController_1.DeleteUserListController.delete);
router.put('/share', ShareListController_1.ShareListController.put);
exports.default = router;
//# sourceMappingURL=list.js.map