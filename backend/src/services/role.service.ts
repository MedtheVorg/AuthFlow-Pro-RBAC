import { Role } from '../models';
import { IRole } from '../types/types';

export function findRoleById(id: string) {
    return Role.findById({ _id: id }).populate('permissions').exec();
}

export function findRoleByName(name: string) {
    return Role.findOne({ name: name }).exec();
}
export function getAllRoles() {
    return Role.find().populate('permissions').exec();
}

export function createRole(input: IRole) {
    return Role.create(input);
}

export function findByIdAndUpdate(id: string, input: Partial<IRole>) {
    return Role.findByIdAndUpdate(id, input, { new: true }).exec();
}

export function findByIdAndDelete(id: string) {
    return Role.findByIdAndDelete(id).exec();
}
