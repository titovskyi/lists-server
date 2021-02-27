"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const PostUserController_1 = require("./PostUserController");
const UpdateUserController_1 = require("./UpdateUserController");
const jwt = require("jsonwebtoken");
const config_1 = require("../../config/config");
const class_validator_1 = require("class-validator");
class LoginUserController {
}
exports.LoginUserController = LoginUserController;
LoginUserController.post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    console.log(phone, 'controller');
    const authToken = jwt.sign({ phone }, config_1.default.jwtSecret);
    const userRepository = typeorm_1.getRepository(User_1.User);
    const user = yield userRepository
        .createQueryBuilder('user')
        .where({ phone })
        .getOne()
        .catch(() => {
        res.status(400).send('Что-то пошло не так LoginUserController getOne');
    });
    if (user) {
        user.authToken = authToken;
        yield LoginUserController.checkErrors(res, user);
        yield UpdateUserController_1.UpdateUserController.put(req, res, user);
    }
    else {
        const user = new User_1.User();
        user.phone = phone;
        user.authToken = authToken;
        yield LoginUserController.checkErrors(res, user);
        yield PostUserController_1.PostUserController.post(req, res, user);
    }
});
LoginUserController.checkErrors = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
});
//# sourceMappingURL=LoginUserController.js.map