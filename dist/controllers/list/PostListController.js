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
exports.PostListController = void 0;
const List_1 = require("../../entity/List");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
class PostListController {
}
exports.PostListController = PostListController;
// #############################################
PostListController.post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = res.locals.jwtPayload;
    const { phone: sharedPhone, list } = req.body;
    const user = yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder('user')
        .where({ phone })
        .leftJoinAndSelect('user.lists', 'lists')
        .select(['user.id'])
        .getOne()
        .catch(() => {
        res.status(400).send('Что-то пошло не так PostListController select user');
    });
    const sharedUser = yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder('user')
        .where({ phone: sharedPhone })
        .leftJoinAndSelect('user.lists', 'lists')
        .select(['user.id'])
        .getOne()
        .catch(() => {
        res.status(400).send('Что-то пошло не так PostListController select user');
    });
    if (!list.id) {
        yield PostListController.postNewList(res, list, user, sharedUser);
    }
    else if (list.id) {
        yield PostListController.shareList(res, list, sharedUser);
    }
});
// #############################################
PostListController.postNewList = (res, list, user, sharedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const newList = new List_1.List();
    newList.name = list.name;
    newList.users = user && sharedUser ? [user, sharedUser] : null;
    yield PostListController.validateAndSaveList(res, newList);
});
PostListController.shareList = (res, list, sharedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const existList = yield typeorm_1.getRepository(List_1.List)
        .createQueryBuilder('list')
        .where({ id: list.id })
        .select(['user.id'])
        .getOne()
        .catch(() => {
        res.status(400).send('Что-то пошло не так PostListController select list');
    });
    if (sharedUser && existList) {
        for (let i = 0; existList.users.length > i; i++) {
            if (existList.users[i].id === sharedUser.id) {
                res.status(200).send('Пользователь уже добавлен ShareListController add user list');
                return;
            }
        }
        existList.users.push(sharedUser);
        yield PostListController.validateAndSaveList(res, existList);
    }
});
// #############################################
PostListController.validateAndSaveList = (res, list) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield class_validator_1.validate(list);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    try {
        yield typeorm_1.getRepository(List_1.List).save(list);
        res.status(200).send(list);
    }
    catch (err) {
        res.status(400).send(err + 'PostListController user && existList');
    }
});
//# sourceMappingURL=PostListController.js.map