import { z, string, object, TypeOf } from 'zod'

export const signUpSchema = object({
	username: string({
		required_error: 'Username is required',
	}),

	email: string({
		required_error: 'Email is required',
	}).email('Not a valid email.'),

	password: string({
		required_error: 'Password is required',
	}).min(5, 'password too short , minimum 5 characters'),
})

export const readUserSchema = object({
	// userID: string().refine((taskId) => mongoose.Types.ObjectId.isValid(taskId), { message: 'Invalid User ID ' }),
})
export type SignUpInput = TypeOf<typeof signUpSchema>
export type readUserId = TypeOf<typeof readUserSchema>
