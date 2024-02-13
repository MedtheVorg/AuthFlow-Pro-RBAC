import mongoose from 'mongoose';
import { string, TypeOf, object, enum as enum_, date } from 'zod';

export const readTaskSchema = object({
    params: object({
        taskID: string().refine(
            (taskId) => mongoose.Types.ObjectId.isValid(taskId),
            { message: 'Invalid Task ID ' }
        ),
    }),
});
export const createTaskSchema = object({
    body: object({
        title: string({ required_error: 'title is required' }),
        description: string({ required_error: 'description is required' }),
        priority: enum_(['Low', 'Normal', 'Urgent'], {
            required_error: 'Invalid priority',
        }),
        status: enum_(['To Do', 'In Progress', 'Completed'], {
            required_error: 'Invalid status',
        }),
        deadline: string().transform((str) => new Date(str)),
        author: string().refine(
            (authorID) => mongoose.Types.ObjectId.isValid(authorID),
            { message: 'Invalid Author ID ' }
        ),
    }),
});
export const updateTaskSchema = object({
    body: object({
        title: string({ required_error: 'title is required' }).optional(),
        description: string({
            required_error: 'description is required',
        }).optional(),
        priority: enum_(['Low', 'Normal', 'Urgent'], {
            required_error: 'Invalid priority',
        }).optional(),
        status: enum_(['To Do', 'In Progress', 'Completed'], {
            required_error: 'Invalid status',
        }).optional(),
        deadline: string()
            .transform((str) => new Date(str))
            .optional(),
    }),
    params: object({
        taskID: string().refine(
            (taskId) => mongoose.Types.ObjectId.isValid(taskId),
            { message: 'Invalid Task ID ' }
        ),
    }),
});
export const deleteTaskSchema = object({
    params: object({
        taskID: string().refine(
            (taskId) => mongoose.Types.ObjectId.isValid(taskId),
            { message: 'Invalid Task ID ' }
        ),
    }),
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body'];
export type readTaskId = TypeOf<typeof updateTaskSchema>['params'];
export type UpdateTaskId = TypeOf<typeof updateTaskSchema>['params'];
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>['body'];
export type DeleteTaskId = TypeOf<typeof updateTaskSchema>['params'];
