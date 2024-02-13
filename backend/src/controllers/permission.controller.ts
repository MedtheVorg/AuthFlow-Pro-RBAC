import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
    findAllPermissions,
    createPermission,
    findPermissionByName,
    deletePermissionById,
} from '../services/permission.service';
import { CreatePermissionInput } from '../schemas/permission.schema';
import { throwError } from '../utils/AppError';

const getAllPermissionsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const permissions = await findAllPermissions();

        res.status(200).json({ success: true, permissions: permissions });
    }
);

const createPermissionHandler = asyncHandler(
    async (req: Request<{}, {}, CreatePermissionInput>, res: Response) => {
        const permissionExists = await findPermissionByName(req.body.name);

        if (permissionExists) {
            return throwError(409, 'Permission already exists.');
        }
        const createdPermission = await createPermission(req.body);

        res.status(201).json({
            success: true,
            createdPermission: createdPermission,
        });
    }
);

const deletePermissionHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const { permissionID } = req.params;

        const deletedPermission = await deletePermissionById(permissionID);
        if (!deletedPermission) {
            return throwError(404, 'Permission not found');
        }

        res.status(200).json({
            success: true,
            message: 'permission Deleted.',
        });
    }
);

export {
    getAllPermissionsHandler,
    createPermissionHandler,
    deletePermissionHandler,
};
