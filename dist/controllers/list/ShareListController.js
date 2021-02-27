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
exports.ShareListController = void 0;
const typeorm_1 = require("typeorm");
const List_1 = require("../../entity/List");
const User_1 = require("../../entity/User");
const PostListController_1 = require("./PostListController");
class ShareListController {
}
exports.ShareListController = ShareListController;
ShareListController.put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone: sharedPhone, list } = req.body;
    const user = yield typeorm_1.getRepository(User_1.default)
        .createQueryBuilder()
        .where({ phone: sharedPhone })
        .getOne()
        .catch((err) => {
        res.status(400).send('Что-то пошло не так ShareListController select user');
    });
    const existList = yield typeorm_1.getRepository(List_1.default)
        .createQueryBuilder('list')
        .where({ id: list.id })
        .leftJoinAndSelect('list.users', 'users')
        .relation('users')
        .select(['list.id', 'users'])
        .getOne()
        .then((response) => {
        return response;
    })
        .catch(() => {
        res.status(400).send('Что-то пошло не так ShareListController select list');
    });
    if (existList && user) {
        for (let i = 0; existList.users.length > i; i++) {
            if (existList.users[i].id === user.id) {
                res.status(200).send('Пользователь уже добавлен ShareListController add user list');
                return;
            }
        }
        existList.users.push(user);
        try {
            yield typeorm_1.getRepository(List_1.default).save(existList);
            res.status(200).send({});
        }
        catch (err) {
            res.status(400).send(err + 'PostListController save list error');
        }
    }
    else if (user && !existList) {
        yield PostListController_1.PostListController.post(req, res);
    }
    else {
        res.status(400).send('Что-то пошло не так ShareListController add user list');
    }
});
//# sourceMappingURL=ShareListController.js.map