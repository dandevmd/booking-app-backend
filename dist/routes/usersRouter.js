"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const verifyTokenMiddleware_1 = require("../middleware/verifyTokenMiddleware");
//initialize router
const userRouter = (0, express_1.Router)();
//define all routes
//test route to check user authentication
userRouter.get("/checkauthentification", verifyTokenMiddleware_1.verifyToken, (req, res, next) => {
    res.send("You are logged in");
});
//test route to check if user is owner or is admin
userRouter.get("/checkuser/:id", verifyTokenMiddleware_1.verifyUser, (req, res, next) => {
    res.send("You are the owner or you are admin");
});
//test route to check if user is admin
userRouter.get("/checkadmin/:id", verifyTokenMiddleware_1.verifyAdmin, (req, res, next) => {
    res.send("You are admin");
});
userRouter.get("/", verifyTokenMiddleware_1.verifyAdmin, userController_1.userController.getAllUsers);
userRouter.get("/:id", verifyTokenMiddleware_1.verifyUser, userController_1.userController.getUserById);
userRouter.put("/:id", verifyTokenMiddleware_1.verifyUser, userController_1.userController.updateUser);
userRouter.delete("/:id", verifyTokenMiddleware_1.verifyUser, userController_1.userController.deleteUser);
//export default router
exports.default = userRouter;
