"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelsController_1 = require("../controllers/hotelsController");
const verifyTokenMiddleware_1 = require("../middleware/verifyTokenMiddleware");
//initialize router
const hotelsRouter = (0, express_1.Router)();
hotelsRouter.post("/", verifyTokenMiddleware_1.verifyAdmin, hotelsController_1.hotelsController.createHotel);
hotelsRouter.put("/:id", verifyTokenMiddleware_1.verifyAdmin, hotelsController_1.hotelsController.updateHotel);
hotelsRouter.delete("/:id", verifyTokenMiddleware_1.verifyAdmin, hotelsController_1.hotelsController.deleteHotel);
hotelsRouter.get("/", hotelsController_1.hotelsController.getAllHotels);
hotelsRouter.get("/find/:id", hotelsController_1.hotelsController.getHotelById);
//get by city and by type
hotelsRouter.get("/city", hotelsController_1.hotelsController.getHotelsByCity);
hotelsRouter.get("/type", hotelsController_1.hotelsController.getHotelsByType);
//export default router
exports.default = hotelsRouter;
