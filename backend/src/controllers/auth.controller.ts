import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { loginSchemaInput } from '../schemas/auth.schema';
import { throwError } from '../utils/AppError';
import { signAccessToken } from '../services/auth.service';
import { findUserByEmail } from '../services/user.service';

const loginHandler = asyncHandler(
    async (req: Request<{}, {}, loginSchemaInput>, res: Response) => {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return throwError(400, 'Invalid email or password');
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
            return throwError(400, 'Invalid email or password');
        }

        //sign accessToken
        const accessToken = signAccessToken(user);

        //cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 2,
        });

        res.status(200).json({
            success: true,
            userInfo: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    }
);

const logOutHandler = asyncHandler(
    async (req: Request<{}, {}, loginSchemaInput>, res: Response) => {
        res.cookie('accessToken', '', {
            expires: new Date(0),
        });
        res.status(200).json({ success: true, message: 'User Logged out.' });
    }
);
export { loginHandler, logOutHandler };
