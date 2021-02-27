"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
const class_validator_1 = require("class-validator");
let List = class List {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], List.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], List.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], List.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], List.prototype, "updateAt", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1.default, (user) => user.lists),
    typeorm_1.JoinTable(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], List.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => Product_1.Product, (product) => product.list, { cascade: true }),
    __metadata("design:type", Array)
], List.prototype, "products", void 0);
List = __decorate([
    typeorm_1.Entity()
], List);
exports.List = List;
exports.default = List;
//# sourceMappingURL=List.js.map