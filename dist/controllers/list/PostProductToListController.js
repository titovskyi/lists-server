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
exports.PostProductToListController = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../../entity/Product");
const List_1 = require("../../entity/List");
class PostProductToListController {
}
exports.PostProductToListController = PostProductToListController;
PostProductToListController.post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { products } = req.body;
    const listRepository = typeorm_1.getRepository(List_1.default);
    const list = yield listRepository
        .createQueryBuilder('list')
        .where({ id })
        .leftJoinAndSelect('list.products', 'products')
        .relation('products')
        .select(['list.id', 'products'])
        .getOne()
        .catch(() => {
        res.status(400).send('Что-то пошло не так PostProductToListController select list');
    });
    if (list) {
        for (let i = 0; products.length > i; i++) {
            const product = yield PostProductToListController.createProduct(products[i].name, products[i].category);
            list.products.push(product);
        }
        try {
            yield listRepository.save(list);
        }
        catch (err) {
            res.status(400).send(err + 'PostProductToListController save error');
        }
        res.status(200).send(list);
    }
    else {
        res.status(400).send('PostProductToListController list not found error');
    }
});
PostProductToListController.createProduct = (name, category) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.Product();
    product.name = name;
    product.category = category;
    product.status = false;
    yield typeorm_1.getRepository(Product_1.Product).save(product);
    return product;
});
//# sourceMappingURL=PostProductToListController.js.map