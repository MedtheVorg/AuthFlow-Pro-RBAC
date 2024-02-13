import express from 'express';
import {
    assignRoleHandler,
    createRoleHandler,
    deleteRoleHandler,
    getAllRolesHandler,
    getRoleHandler,
    updateRoleHandler,
} from '../controllers/role.controller';

const router = express.Router();

router.get('/', getAllRolesHandler);
router.post('/', createRoleHandler);
router
    .route('/:roleID')
    .get(getRoleHandler)
    .delete(deleteRoleHandler)
    .patch(updateRoleHandler);
router.post('/assign', assignRoleHandler);

export default router;
