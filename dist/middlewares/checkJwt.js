"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
exports.checkJwt = (req, res, next) => {
    const authToken = req.headers.authtoken;
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(authToken, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send('Ошибка авторизации!');
        return;
    }
    next();
};
//# sourceMappingURL=checkJwt.js.map