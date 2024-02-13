import { TypeOf, object, string } from 'zod'

export const createPermissionSchema = object({
	name: string().min(1, 'Permission name is required'),
})

export type CreatePermissionInput = TypeOf<typeof createPermissionSchema>
