import z, { string, object } from 'zod'

export const signInSchema = object({
	email: string({ required_error: 'Email is required' }).email('Invalid email.'),
	password: string({ required_error: 'Password is required' }).min(5, 'too short , minimum length is 5 characters'),
})

export type SignInInput = z.infer<typeof signInSchema>
