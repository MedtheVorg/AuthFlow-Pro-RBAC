import { Document, HydratedDocument } from 'mongoose';
import { IUser } from '../types/types';
import { signJwt } from '../utils/jwt';

export function signAccessToken(user: HydratedDocument<IUser>) {
    const payload = user.toJSON();

    const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
        expiresIn: '2d',
    });

    return accessToken;
}
