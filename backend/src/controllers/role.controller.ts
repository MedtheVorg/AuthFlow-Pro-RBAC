import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Role } from '../models';
import { CustomError, throwError } from '../utils/AppError';
import { findUserById } from '../services/user.service';
import {
    createRole,
    findByIdAndDelete,
    findByIdAndUpdate,
    findRoleById,
    findRoleByName,
    getAllRoles,
} from '../services/role.service';

const getAllRolesHandler = asyncHandler(async (req: Request, res: Response) => {
    const roles = await getAllRoles();

    res.status(200).json({ success: true, roles: roles });
});
const createRoleHandler = asyncHandler(async (req: Request, res: Response) => {
    const { name, permissions } = req.body;
    const roleExists = await findRoleByName(name);

    if (roleExists) {
        return throwError(409, `"${name}" role already Exists.`);
    }
    const createdRole = await createRole(req.body);

    res.status(201).json({ success: true, role: createdRole });
});
const getRoleHandler = asyncHandler(async (req: Request, res: Response) => {
    const { roleID } = req.params;
    console.log(roleID);

    const fetchedRole = await findRoleById(roleID);
    if (!fetchedRole) {
        return throwError(404, `Role does not exist with the id :${roleID}`);
    }
    res.status(200).json({ success: true, role: fetchedRole });
});

const updateRoleHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { roleID } = req.params;
        let updatedRole = await findByIdAndUpdate(roleID, req.body);
        if (!updatedRole) {
            return throwError(
                404,
                `Role does not exist with the id :${roleID}`
            );
        }

        res.status(200).json({ success: true, role: updatedRole });
    }
);
const deleteRoleHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { roleID } = req.params;
        const deletedRole = await findByIdAndDelete(roleID);
        if (!deletedRole) {
            return throwError(
                404,
                `Role does not exist with the id :${roleID}`
            );
        }
        res.status(200).json({ success: true, role: deletedRole });
    }
);

const assignRoleHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { roleID, userID } = req.body;

        const user = await findUserById(userID);
        const role = await findRoleById(roleID);
        if (!user) {
            throw new CustomError({
                message: `Invalid User.`,
                httpCode: 404,
            });
        }
        if (!role) {
            throw new CustomError({
                message: `Invalid Role.`,
                httpCode: 404,
            });
        }
        await user.updateOne({ role: role._id });

        res.status(200).json({
            success: true,
            message: `Assigned role of "${role.name}" to user ${user.username} successfully.`,
        });
    }
);

export {
    getAllRolesHandler,
    createRoleHandler,
    getRoleHandler,
    deleteRoleHandler,
    updateRoleHandler,
    assignRoleHandler,
};
