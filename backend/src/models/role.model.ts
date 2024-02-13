import { Schema, model } from 'mongoose';
import { IRole } from '../types/types';

const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true,
    },
    permissions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Permission',
        },
    ],
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
