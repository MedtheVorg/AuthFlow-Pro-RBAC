import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CustomError, throwError } from '../utils/AppError';
import { verifyJwt } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { IPermission, IRole, IUser } from '../types/types';
import { HydratedDocument } from 'mongoose';
import { findUserById } from '../services/user.service';

type AccessPermission =
    | 'UPDATE_TASK'
    | 'CREATE_TASK'
    | 'DELETE_TASK'
    | 'READ_TASK'
    | 'READ_TASKS'
    | 'READ_USERS'
    | 'DELETE_USER'
    | 'READ_PERMISSIONS'
    | 'CREATE_PERMISSION'
    | 'DELETE_USER';

export const hasPermissionTo = (accessPermission: AccessPermission) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['accessToken'];
        console.log('🚀 ~ asyncHandler ~ req.cookies:', req.cookies);
        console.log('🚀 ~ asyncHandler ~ token:', token);

        // token 404
        if (!token) {
            return throwError(401, 'Unauthorized');
        }
        const decodedToken = verifyJwt<HydratedDocument<IUser>>(
            token,
            'accessTokenPublicKey'
        );

        console.log('🚀 ~ asyncHandler ~ decodedToken:', decodedToken);
        // invalid token
        if (!decodedToken) {
            return throwError(401, 'Unauthorized');
        }

        const user = await findUserById(decodedToken._id.toString());
        console.log('🚀 ~ asyncHandler ~ user:', user);

        if (!user) {
            return throwError(401, 'Unauthorized');
        }
        if (!user.role) {
            return throwError(403, 'Forbidden');
        }
        const userPermissions = (user.role as IRole)
            .permissions as IPermission[];
        const hasPermission = userPermissions.find(
            (permission: IPermission) => permission.name === accessPermission
        );

        if (!hasPermission) {
            return throwError(403, 'Forbidden');
        }

        next();
    });
