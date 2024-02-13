import { User } from '../models';
import { IUser } from '../types/types';

export function createUser(input: Partial<IUser>) {
    return User.create(input);
}

export function findUserById(id: string) {
    return User.findById(id)
        .populate({ path: 'role', populate: { path: 'permissions' } })
        .select('-password')
        .exec();
}

export function findUserByEmail(email: string) {
    return User.findOne({ email })
        .populate({ path: 'role', populate: { path: 'permissions' } })
        .exec();
}

export function findAllUsers() {
    return User.find()
        .populate({ path: 'role', populate: { path: 'permissions' } })
        .exec();
}

export function deleteUserById(id: string) {
    return User.deleteOne({ _id: id }).exec();
}
