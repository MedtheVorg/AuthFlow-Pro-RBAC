import z, { string, date } from 'zod'

export const createTaskSchema = z.object({
	title: string().min(1, 'title is required'),
	description: string().min(1, 'description is required'),
	author: string(),
	priority: z.enum(['Low', 'Normal', 'Urgent']),
	status: z.enum(['To Do', 'In Progress', 'Completed', 'Canceled']),
	deadline: date({ description: 'invalid date' }),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
	title: string().min(1, 'title is required').optional(),
	description: string().min(1, 'description is required').optional(),
	author: string().optional(),
	priority: z.enum(['Low', 'Normal', 'Urgent']),
	status: z.enum(['To Do', 'In Progress', 'Completed', 'Canceled']),
	deadline: date({ description: 'invalid date' }),
})

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
