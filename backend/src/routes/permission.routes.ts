import express from 'express';
import {
    createPermissionHandler,
    deletePermissionHandler,
    getAllPermissionsHandler,
} from '../controllers/permission.controller';
import validateResource from '../middlewares/validateResources';
import { createPermissionSchema } from '../schemas/permission.schema';

const router = express.Router();

router.get('/', getAllPermissionsHandler);
router.post(
    '/',
    validateResource(createPermissionSchema),
    createPermissionHandler
);
router.delete('/:permissionID', deletePermissionHandler);

export default router;
