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
const express_1 = require("express");
const product_1 = require("./product");
const list_1 = require("./list");
const user_1 = require("./user");
const checkJwt_1 = require("../middlewares/checkJwt");
const routes = express_1.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { console.log('hello / route'); }));
routes.use('/user', user_1.default);
routes.use('/list', [checkJwt_1.checkJwt], list_1.default);
routes.use('/product', [checkJwt_1.checkJwt], product_1.default);
exports.default = routes;
//   "host": "localhost",
//   "port": 5432,
//   "username": "postgres",
//   "password": "0123456789",
//   "database": "purchaseLists",
//# sourceMappingURL=index.js.map