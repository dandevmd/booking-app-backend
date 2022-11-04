"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomsController_1 = require("../controllers/roomsController");
const verifyTokenMiddleware_1 = require("../middleware/verifyTokenMiddleware");
//initialize router
const roomsRouter = (0, express_1.Router)();
//on create room route the id is of the hotel
roomsRouter.post('/:id', verifyTokenMiddleware_1.verifyAdmin, roomsController_1.roomsController.createRoom);
roomsRouter.put('/:id', verifyTokenMiddleware_1.verifyAdmin, roomsController_1.roomsController.updateRoom);
roomsRouter.delete('/:id', verifyTokenMiddleware_1.verifyAdmin, roomsController_1.roomsController.deleteRoom);
roomsRouter.get('/', roomsController_1.roomsController.getRooms);
roomsRouter.get('/:id', roomsController_1.roomsController.getRoom);
//export default router
exports.default = roomsRouter;
