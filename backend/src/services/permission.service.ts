import { Permission } from '../models';
import { IPermission } from '../types/types';

export function createPermission(input: IPermission) {
    return Permission.create(input);
}

export function findAllPermissions() {
    return Permission.find().exec();
}
export function findPermissionByName(name: string) {
    return Permission.findOne({ name: name }).exec();
}

export function deletePermissionById(id: string) {
    return Permission.findByIdAndDelete({ _id: id }).exec();
}
