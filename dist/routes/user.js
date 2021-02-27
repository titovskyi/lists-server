"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginUserController_1 = require("../controllers/user/LoginUserController");
const checkJwt_1 = require("../middlewares/checkJwt");
const CheckUserByTokenController_1 = require("../controllers/user/CheckUserByTokenController");
const router = express_1.Router();
router.get('/', [checkJwt_1.checkJwt], CheckUserByTokenController_1.CheckUserByTokenController.get);
router.post('/login', LoginUserController_1.LoginUserController.post);
exports.default = router;
//# sourceMappingURL=user.js.map