import {Router} from 'express';
import authRouter from './authRouter';
import usersRouter from './usersRouter';
import hotelsRouter from './hotelsRouter';
import roomsRouter from './roomsRouter';

//initialize router
const router = Router();

//use Routers
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/hotels', hotelsRouter);
router.use('/rooms', roomsRouter);

export default router;

