import express from 'express';
import permissionRouter from './permission.routes';
import roleRouter from './role.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import taskRouter from './task.routes';
const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));
router.use('/permissions', permissionRouter);
router.use('/roles', roleRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

export default router;
