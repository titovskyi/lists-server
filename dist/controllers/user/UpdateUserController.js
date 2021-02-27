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
exports.UpdateUserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
class UpdateUserController {
}
exports.UpdateUserController = UpdateUserController;
UpdateUserController.put = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder()
        .update(User_1.User)
        .set({ authToken: user.authToken })
        .where({ phone: user.phone })
        .execute()
        .then(() => {
        res.status(200).send({ authToken: user.authToken });
    })
        .catch(() => {
        res.status(400).send('Что-то пошло не так LoginUserController update');
    });
});
//# sourceMappingURL=UpdateUserController.js.map