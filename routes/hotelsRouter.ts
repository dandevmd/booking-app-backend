import { Router } from "express";
import { hotelsController } from "../controllers/hotelsController";
import { verifyAdmin } from "../middleware/verifyTokenMiddleware";

//initialize router
const hotelsRouter = Router();

hotelsRouter.post("/", verifyAdmin, hotelsController.createHotel);
hotelsRouter.put("/:id", verifyAdmin, hotelsController.updateHotel);
hotelsRouter.delete("/:id", verifyAdmin, hotelsController.deleteHotel);
hotelsRouter.get("/", hotelsController.getAllHotels);
hotelsRouter.get("/find/:id", hotelsController.getHotelById);
//get by city and by type
hotelsRouter.get("/city", hotelsController.getHotelsByCity);
hotelsRouter.get("/type", hotelsController.getHotelsByType);

//export default router
export default hotelsRouter;
