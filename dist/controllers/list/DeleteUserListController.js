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
exports.DeleteUserListController = void 0;
const typeorm_1 = require("typeorm");
const List_1 = require("../../entity/List");
const DeleteListController_1 = require("./DeleteListController");
class DeleteUserListController {
}
exports.DeleteUserListController = DeleteUserListController;
DeleteUserListController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = res.locals.jwtPayload;
    const { id } = req.params;
    const listRepository = typeorm_1.getRepository(List_1.default);
    let list = yield listRepository
        .createQueryBuilder('list')
        .where({ id })
        .leftJoinAndSelect('list.users', 'users')
        .relation('users')
        .select(['list.id', 'users'])
        .getOne();
    if (list.users.length > 1) {
        list.users = list.users.filter((user) => user.phone !== phone);
    }
    else {
        yield DeleteListController_1.DeleteListController.delete(req, res);
        return;
    }
    try {
        yield listRepository.save(list);
        res.status(200).send({});
    }
    catch (err) {
        res.status(400).send(err + 'DeleteUserListController save list error');
    }
});
//# sourceMappingURL=DeleteUserListController.js.map