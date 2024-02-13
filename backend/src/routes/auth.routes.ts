import express from 'express';
import { loginSchema } from '../schemas/auth.schema';
import { validateResources } from '../middlewares';
import { logOutHandler, loginHandler } from '../controllers/auth.controller';
const router = express.Router();

router.post('/login', validateResources(loginSchema), loginHandler);
router.post('/logout', logOutHandler);

export default router;
