import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CreateUserInput, readUserId } from '../schemas/user.schema';
import { User } from '../models';
import { CustomError, throwError } from '../utils/AppError';
import {
    createUser,
    deleteUserById,
    findAllUsers,
    findUserByEmail,
    findUserById,
} from '../services/user.service';

const getAllUsers = asyncHandler(
    async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
        const users = await findAllUsers();

        res.status(200).json({ success: true, users: users });
    }
);
const getUser = asyncHandler(
    async (req: Request<readUserId>, res: Response) => {
        const user = await findUserById(req.params.userID);
        if (!user) {
            return throwError(404, 'User not found');
        }
        res.status(200).json({ success: true, user: user });
    }
);
const createUserHandler = asyncHandler(
    async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
        const { email } = req.body;
        const userExists = await findUserByEmail(email);
        if (userExists) {
            throw new CustomError({
                message: `User already Exists.`,
                httpCode: 409,
            });
        }
        const user = await createUser(req.body);

        res.status(201).json({ success: true, user: user });
    }
);
const deleteUserHandler = asyncHandler(
    async (req: Request<readUserId>, res: Response) => {
        const user = await findUserById(req.params.userID);
        if (!user) {
            return throwError(404, 'User not found');
        }
        const deletedUser = await deleteUserById(req.params.userID);

        res.status(200).json({ success: true, deletedUser: deletedUser });
    }
);
export { createUserHandler, getAllUsers, getUser, deleteUserHandler };
