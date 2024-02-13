import express from 'express';
import {
    createTaskHandler,
    deleteTaskHandler,
    readAllTasksHandler,
    readTaskHandler,
    updateTaskHandler,
} from '../controllers/task.controller';
import {
    createTaskSchema,
    deleteTaskSchema,
    readTaskSchema,
    updateTaskSchema,
} from '../schemas/task.schema';
import { validateResources } from '../middlewares';
import { hasPermissionTo } from '../middlewares/authenticate';

const router = express.Router();

router
    .route('/')
    .post(
        hasPermissionTo('CREATE_TASK'),
        validateResources(createTaskSchema),
        createTaskHandler
    )
    .get(readAllTasksHandler);
router
    .route('/:taskID')
    .get(
        hasPermissionTo('READ_TASK'),
        validateResources(readTaskSchema),
        readTaskHandler
    )
    .patch(
        hasPermissionTo('UPDATE_TASK'),
        validateResources(updateTaskSchema),
        updateTaskHandler
    )
    .delete(
        hasPermissionTo('DELETE_TASK'),
        validateResources(deleteTaskSchema),
        deleteTaskHandler
    );

export default router;
