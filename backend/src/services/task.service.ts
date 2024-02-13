import { Task } from '../models/task.model';
import { ITask } from '../types/types';

export function findAllTasks() {
    return Task.find().populate({ path: 'author', select: '-password' }).exec();
}

export function findTaskById(id: string) {
    return Task.findById({ _id: id })
        .populate({ path: 'author', select: '-password' })
        .exec();
}

export function createTask(input: ITask) {
    return Task.create(input);
}

export function findByIdAndUpdate(id: string, input: Partial<ITask>) {
    return Task.findByIdAndUpdate({ _id: id }, input, { new: true }).exec();
}

export function findByIdAndDelete(id: string) {
    return Task.findByIdAndDelete({ _id: id }).exec();
}
