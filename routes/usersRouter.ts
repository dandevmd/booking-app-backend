import { Router } from "express";
import { userController } from "../controllers/userController";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../middleware/verifyTokenMiddleware";

//initialize router
const userRouter = Router();

//define all routes

//test route to check user authentication
userRouter.get("/checkauthentification", verifyToken, (req, res, next) => {
  res.send("You are logged in");
});

//test route to check if user is owner or is admin
userRouter.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("You are the owner or you are admin");
});

//test route to check if user is admin
userRouter.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("You are admin");
});

userRouter.get("/", verifyAdmin, userController.getAllUsers);
userRouter.get("/:id", verifyUser, userController.getUserById);
userRouter.put("/:id", verifyUser, userController.updateUser);
userRouter.delete("/:id", verifyUser, userController.deleteUser);

//export default router
export default userRouter;
