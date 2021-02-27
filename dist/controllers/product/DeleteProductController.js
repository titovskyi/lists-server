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
exports.DeleteProductController = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../../entity/Product");
class DeleteProductController {
}
exports.DeleteProductController = DeleteProductController;
DeleteProductController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield typeorm_1.getRepository(Product_1.default)
        .createQueryBuilder('product')
        .delete()
        .from(Product_1.default)
        .where({ id })
        .execute()
        .then(() => {
        res.status(200).send({});
    })
        .catch((err) => {
        res.status(400).send(err + 'DeleteProductController delete product');
    });
});
//# sourceMappingURL=DeleteProductController.js.map