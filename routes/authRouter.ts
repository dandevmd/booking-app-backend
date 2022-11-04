import { Router } from "express";
import { authController } from "../controllers/authController";

//initialize router
const authRouter = Router();

//define routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

//export default router
export default authRouter;