"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
//initialize router
const authRouter = (0, express_1.Router)();
//define routes
authRouter.post("/register", authController_1.authController.register);
authRouter.post("/login", authController_1.authController.login);
//export default router
exports.default = authRouter;
