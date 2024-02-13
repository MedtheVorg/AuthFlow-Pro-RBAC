import express from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    getAllUsers,
    getUser,
} from '../controllers/user.controller';
import validateResource from '../middlewares/validateResources';
import { createUserSchema, userIDSchema } from '../schemas/user.schema';
import { hasPermissionTo } from '../middlewares/authenticate';

const router = express.Router();

router
    .route('/')
    .get(hasPermissionTo('READ_USERS'), getAllUsers)
    .post(validateResource(createUserSchema), createUserHandler);
router
    .route('/:userID')
    .get(validateResource(userIDSchema), getUser)
    .delete(
        hasPermissionTo('DELETE_USER'),
        validateResource(userIDSchema),
        deleteUserHandler
    );

export default router;
