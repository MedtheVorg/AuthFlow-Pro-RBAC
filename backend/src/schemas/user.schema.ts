import mongoose from 'mongoose';
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required',
        }),

        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email.'),

        password: string({
            required_error: 'Password is required',
        }).min(5, 'password too short , minimum 5 characters'),
    }),
});
export const userIDSchema = object({
    params: object({
        userID: string().refine(
            (taskId) => mongoose.Types.ObjectId.isValid(taskId),
            { message: 'Invalid User ID ' }
        ),
    }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type readUserId = TypeOf<typeof userIDSchema>['params'];
