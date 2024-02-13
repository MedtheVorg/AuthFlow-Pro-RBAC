import mongoose from 'mongoose';
import { Task } from '../models/task.model';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import {
    createTask,
    findAllTasks,
    findByIdAndDelete,
    findByIdAndUpdate,
    findTaskById,
} from '../services/task.service';
import { throwError } from '../utils/AppError';
import {
    CreateTaskInput,
    DeleteTaskId,
    UpdateTaskId,
    UpdateTaskInput,
    readTaskId,
} from '../schemas/task.schema';

const readAllTasksHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = await findAllTasks();
        res.status(200).json({ success: true, tasks: tasks });
    }
);

const readTaskHandler = asyncHandler(
    async (req: Request<readTaskId>, res: Response, next: NextFunction) => {
        const task = await findTaskById(req.params.taskID);
        if (!task) {
            throwError(404, 'Task not found.');
        }
        res.status(200).json({ success: true, task: task });
    }
);

const createTaskHandler = asyncHandler(
    async (
        req: Request<{}, {}, CreateTaskInput>,
        res: Response,
        next: NextFunction
    ) => {
        const task = await createTask(req.body);

        res.status(201).json({
            success: true,
            createdTask: task,
        });
    }
);

const updateTaskHandler = asyncHandler(
    async (
        req: Request<UpdateTaskId, {}, UpdateTaskInput>,
        res: Response,
        next: NextFunction
    ) => {
        const updatedTask = await findByIdAndUpdate(
            req.params.taskID,
            req.body
        );
        if (!updatedTask) {
            throwError(404, 'Task not found');
        }
        res.status(200).json({ success: true, updatedTask: updatedTask });
    }
);
const deleteTaskHandler = asyncHandler(
    async (req: Request<DeleteTaskId>, res: Response, next: NextFunction) => {
        const taskToDelete = await findByIdAndDelete(req.params.taskID);
        if (!taskToDelete) {
            throwError(404, 'Task not found.');
        }
        res.status(200).json({ success: true, message: 'Task deleted.' });
    }
);
export {
    readAllTasksHandler,
    readTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
};
