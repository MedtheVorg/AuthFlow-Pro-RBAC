import { Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: Schema.Types.ObjectId | IRole;
}

export interface IRole {
    name: string;
    permissions: Schema.Types.ObjectId[] | IPermission[];
}

export interface IPermission {
    name: string;
}

export interface ITask {
    title: string;
    description: string;
    priority: 'Low' | 'Normal' | 'Urgent';
    status: 'To Do' | 'In Progress' | 'Completed';
    deadline: Date;
    author: Schema.Types.ObjectId | IUser | string;
}
