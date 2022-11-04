import {Router} from 'express';
import {roomsController} from '../controllers/roomsController';
import { verifyAdmin } from '../middleware/verifyTokenMiddleware';

//initialize router
const roomsRouter = Router();

//on create room route the id is of the hotel
roomsRouter.post('/:id', verifyAdmin, roomsController.createRoom);
roomsRouter.put('/:id', verifyAdmin, roomsController.updateRoom);
roomsRouter.delete('/:id',verifyAdmin, roomsController.deleteRoom);
roomsRouter.get('/', roomsController.getRooms);
roomsRouter.get('/:id', roomsController.getRoom);


//export default router
export default roomsRouter;
