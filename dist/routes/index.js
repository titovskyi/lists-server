"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./product");
const list_1 = require("./list");
const user_1 = require("./user");
const checkJwt_1 = require("../middlewares/checkJwt");
const routes = express_1.Router();
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