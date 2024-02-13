import mongoose, { Schema, model } from 'mongoose';
import { ITask } from '../types/types';

const taskSchema = new Schema<ITask>(
    {
        title: String,
        description: String,
        priority: {
            type: String,
            default: 'Normal',
        },
        status: {
            type: String,
            default: 'To Do',
        },

        deadline: Date,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

const Task = model<ITask>('Task', taskSchema);

export { Task };
