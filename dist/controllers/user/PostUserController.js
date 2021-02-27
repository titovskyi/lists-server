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
exports.PostUserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
class PostUserController {
}
exports.PostUserController = PostUserController;
PostUserController.post = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder()
        .insert()
        .into(User_1.User)
        .values([{ phone: user.phone, authToken: user.authToken }])
        .execute()
        .then(() => {
        res.status(200).send({ authToken: user.authToken });
    })
        .catch(() => {
        res.status(400).send('Что-то пошло не так PostUserController insert');
    });
});
//# sourceMappingURL=PostUserController.js.map