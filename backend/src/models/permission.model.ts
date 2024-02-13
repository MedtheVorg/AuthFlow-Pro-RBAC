// import { Schema, model } from 'mongoose';
// import { IPermission } from '../types/types';

// const permissionSchema = new Schema<IPermission>({
//     name: {
//         type: String,
//         required: true,
//     },
// });

// const Permission = model<IPermission>('Permission', permissionSchema);

// export default Permission;

import { getModelForClass, prop } from '@typegoose/typegoose';

export class Permission {
    @prop({ required: true, unique: true, type: String })
    name: string;
}

const PermissionModel = getModelForClass(Permission);

export default PermissionModel;
