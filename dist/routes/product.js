"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DeleteProductController_1 = require("../controllers/product/DeleteProductController");
const UpdateProductController_1 = require("../controllers/product/UpdateProductController");
const router = express_1.Router();
router.put('/:id([0-9]+)', UpdateProductController_1.UpdateProductController.put);
router.delete('/:id([0-9]+)', DeleteProductController_1.DeleteProductController.delete);
exports.default = router;
//# sourceMappingURL=product.js.map